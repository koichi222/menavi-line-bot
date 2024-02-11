import { TextEventMessage, WebhookEvent } from "@line/bot-sdk";
import { Hono } from "hono";
import { Line } from "./line";
import { OpenAI } from "./openai";
import { formatAttendanceResults } from './tools/utils';
import { AttendanceResult, FormattedAttendance } from "./tables";

type Bindings = {
  DB: D1Database;
  CHANNEL_ACCESS_TOKEN: string;
  OPENAI_API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.post("/api/webhook", async (c) => {
  const data = await c.req.json();
  console.log(data)

  const events: WebhookEvent[] = (data as any).events;

  const event = events
    .map((event: WebhookEvent) => {
      if (event.type != "message" || event.message.type != "text") {
        return;
      }
      return event;
    })
    .filter((event) => event)[0];

  if (!event) {
    console.log(`No event: ${events}`);
    return c.json({ message: "ok" });
  }

  const { replyToken } = event;
  const { text } = event.message as TextEventMessage;

  c.executionCtx.waitUntil(replyGeneratedMessage(c.env, text, replyToken));

  return c.json({ message: "ok" });
});

app.post("/api/generate_message", async (c) => {
  const { text } = await c.req.json();
  const generatedMessage = await generateMessageAndSaveHistory(text, c.env);
  return c.json({ message: generatedMessage });
});

async function replyGeneratedMessage(env: Bindings, text: string, replyToken: string) {
  try {
    const lineClient = new Line(env.CHANNEL_ACCESS_TOKEN);

    console.log("*** hoge ***")
    console.log(`text: ${text}`)
    console.log(`replytoken: ${replyToken}`)

    if (text === "お気に入り") {
      console.log("inif");
      await lineClient.replyFavorites(replyToken)
          .then(response => {
            // レスポンスの内容を整形してログに出力
              console.log("replyBubbleMessage response:", JSON.stringify(response, null, 2));
          })
          .catch(error => {
            // エラーをログに出力
              console.error("replyBubbleMessage error:", JSON.stringify(error, null, 2));
          });
    }

    if (text === "検索") {
      var user_id = "U09e867f2177265774544a9e6b536c7f0"
      var query = `SELECT * FROM attendances AS at LEFT JOIN shops ON at.shop_id = shops.id 
      LEFT JOIN casts ON at.cast_id = casts.id
      INNER JOIN ( SELECT cast_id, faved_at FROM favorites 
        WHERE user_id IN ( SELECT id FROM users WHERE line_user_id = '${user_id}' ) ) AS fav_casts
        ON at.cast_id = fav_casts.cast_id ORDER BY fav_casts.faved_at DESC;`
      const { results } = await env.DB.prepare(query).all<AttendanceResult>();
      const formattedResults = formatAttendanceResults(results);
      console.log(formattedResults);
      await lineClient.replyAttendance(results,replyToken)
      console.log("replyBubbleMessage response:", JSON.stringify(results, null, 2));
    }

    //const generatedMessage = await generateMessageAndSaveHistory(text, env);
    //console.log(generatedMessage);

    // Reply to the user
    //await lineClient.replyMessage(generatedMessage, replyToken);
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err);
    const lineClient = new Line(env.CHANNEL_ACCESS_TOKEN);
    await lineClient.replyMessage("I am not feeling well right now.", replyToken);
  }
}

async function generateMessageAndSaveHistory(text: string, env: Bindings) {
  // Fetch 2 conversation from D1
  var user_id = "U09e867f2177265774544a9e6b536c7f0"
  var query = `SELECT * FROM attendances AS at LEFT JOIN shops ON at.shop_id = shops.id 
  LEFT JOIN casts ON at.cast_id = casts.id
  INNER JOIN ( SELECT cast_id, faved_at FROM favorites 
    WHERE user_id IN ( SELECT id FROM users WHERE line_user_id = '${user_id}' ) ) AS fav_casts
    ON at.cast_id = fav_casts.cast_id ORDER BY fav_casts.faved_at DESC;`
  const { results } = await env.DB.prepare(query).all<AttendanceResult>();

  // Generate answer with OpenAI
  const openaiClient = new OpenAI(env.OPENAI_API_KEY);
  const generatedMessage = await openaiClient.generateMessage(results!, text);
  if (!generatedMessage || generatedMessage === "") throw new Error("No message generated");

  // Save generated answer to D1
  await env.DB.prepare(`insert into conversations (message, role) values (?, 'user')`).bind(text).run();
  await env.DB.prepare(`insert into conversations (message, role) values (?, 'assistant')`)
    .bind(generatedMessage)
    .run();

  return generatedMessage;
}

export default app;
