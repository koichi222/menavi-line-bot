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

  public async replyFavorites(replyToken: string): Promise<Response | null> {
    // DBから検索結果をリロードする
    var bubbleList = new Array();

    for (var i = 0; i < 9; i++) {
      // Flexメッセージに設定するBubbleメッセージを作成

      var bubbleMsg = {
          "type": "bubble",
          "size": "hecto",
          "hero": {
            "type": "image",
            "size": "full",
            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_5_carousel.png",
            "aspectMode": "cover"
          },
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "ああああああ",
                "weight": "bold",
                "size": "xl"
              },
              {
                "type": "text",
                "text": "4.3 ★★★★☆",
                "wrap": true,
                "color": "#ff8c00"
              },
              {
                "type": "box",
                "layout": "baseline",
                "contents": [
                  {
                    "type": "text",
                    "text": "まるまる店",
                    "size": "sm",
                    "color": "#666666"
                  }
                ]
              },
              {
                "type": "box",
                "layout": "baseline",
                "contents": [
                  {
                    "type": "text",
                    "text": "20歳 150cm",
                    "size": "md",
                    "color": "#666666"
                  }
                ]
              },
              {
                "type": "separator",
                "margin": "xl"
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "text",
                        "text": "01/20(土)",
                        "size": "md",
                        "weight": "bold",
                        "color": "#3288c9"
                      },
                      {
                        "type": "text",
                        "text": "11:00〜翌5:00",
                        "size": "sm",
                        "color": "#555555"
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "text",
                        "text": "01/21(日)",
                        "size": "md",
                        "weight": "bold",
                        "color": "#D0021B"
                      },
                      {
                        "type": "text",
                        "text": "11:00〜翌5:00",
                        "size": "sm",
                        "color": "#555555"
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "text",
                        "text": "01/22(月)",
                        "size": "md",
                        "weight": "bold",
                        "color": "#111111"
                      },
                      {
                        "type": "text",
                        "text": "11:00〜翌5:00",
                        "size": "sm",
                        "color": "#555555"
                      }
                    ]
                  }
                ],
                "spacing": "sm",
                "paddingAll": "13px"
              }
            ]
          },
          "footer": {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "button",
                "action": {
                  "type": "postback",
                  "label": "予約する",
                  "data": "action=book&itemid=123"
                },
                "color": "#3CC932",
                "style": "primary"
              }
            ]
          },
          "styles": {
            "footer": {
              "separator": true
            }
          }
        }
      bubbleList.push(bubbleMsg);
    }

    var nextCnt = 10
    if (nextCnt > 0){
      var bubbleMsg2 = {
        "type": "bubble",
        "size": "hecto",
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "続きのお店情報があります！",
              "wrap": true,
              "color": "#c71585"
            },
            {
              "type": "text",
              "text": "【残り件数】" + nextCnt + "件",
              "wrap": true,
              "margin": "xl"
            }
          ]
        },
        "footer": {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "button",
              "action": {
                "type": "postback",
                "label": "続きを見る",
                "data": "nextResults",
              }
            }
          ]
        },
        "styles": {
          "footer": {
            "backgroundColor": "#e3adc1",
            "separator": true,
            "separatorColor": "#c0c0c0"
          }
        }
      };
      bubbleList.push(bubbleMsg2);
    }

    //Flexメッセージ作成
    var flexMsg = {
      "type": "flex",
      "altText": "お気に入り",
      "contents": {
        "type": "carousel",
        "contents": bubbleList
      }
    };

    console.log(flexMsg);
    console.log(replyToken);
    return await fetch(`${this.baseUrl}/v2/bot/message/reply`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        replyToken: replyToken,
        messages: [flexMsg],
      }),
    }).catch((err) => {
      console.log(`LINE API error: ${err}`);
      return null;
    });
  }
}
