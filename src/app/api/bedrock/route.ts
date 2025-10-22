import { BedrockRuntimeClient, ConverseCommand } from "@aws-sdk/client-bedrock-runtime";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
try {
    const url = "https://bedrock-runtime.us-east-1.amazonaws.com/model/us.anthropic.claude-3-5-haiku-20241022-v1:0/converse";
    
    const payload = {
      "messages": [
        {
          "role": "user",
          "content": [{"text": "自己開示につながるアイスブレイクの話題を1つ返して。一風変わったものがよいです。そして一人当たりの発表時間も考慮して、話題では3つ教えてとかではなく答えやすいシンプルな話題にしてほしい。レスポンスはアプリでユーザーに表示するのでトピックだけ返してほしい"}]
        }
      ],
      "inferenceConfig": {
        "temperature": 1.0,     // 0.0〜1.0 (デフォルト: 1.0)
        "maxTokens": 500,       // 最大トークン数
        "topP": 0.9,           // トップP sampling (0.0〜1.0)
        "stopSequences": []     // 停止シーケンス
      }
    };

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
    };


    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    return NextResponse.json({
      output: data
    });
  } catch (error) {
    console.error("API Error:", error);
  }
}
