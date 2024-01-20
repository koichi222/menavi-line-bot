export class Line {
  private readonly headers: Record<string, string>;
  private readonly baseUrl = "https://api.line.me";

  constructor(accessToken: string) {
    this.headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
  }

  public async replyMessage(text: string, replyToken: string): Promise<Response | null> {
    const message = {
      type: "text",
      text,
    };
    return await fetch(`${this.baseUrl}/v2/bot/message/reply`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        replyToken: replyToken,
        messages: [message],
      }),
    }).catch((err) => {
      console.log(`LINE API error: ${err}`);
      return null;
    });
  }

  public async replyFlexMessage(text: string, replyToken: string): Promise<Response | null> {
    const flexMessage = [
      {
        "type": "flex",
        "altText": text,
        "contents": {
          "type": "carousel",
          "contents": [
            {
              "type": "bubble",
              "styles": {
                "header": {
                  "backgroundColor": "#ffaaaa"
                },
                "body": {
                  "backgroundColor": "#aaffaa"
                },
                "footer": {
                  "backgroundColor": "#aaaaff"
                }
              },
              "header": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": "header"
                  }
                ]
              },
              "hero": {
                "type": "image",
                "url": "https://example.com/flex/images/image.jpg",
                "size": "full",
                "aspectRatio": "2:1"
              },
              "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": "body"
                  }
                ]
              },
              "footer": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": "footer"
                  }
                ]
              }
            }
          ]
        }
      }
    ];
    // このmessages変数は、LINE Messaging APIでメッセージを送信する際に使用できます。
    console.log(flexMessage);
    console.log(replyToken);
    return await fetch(`${this.baseUrl}/v2/bot/message/reply`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        replyToken: replyToken,
        messages: flexMessage,
      }),
    }).catch((err) => {
      console.log(`LINE API error: ${err}`);
      return null;
    });
  }
}
