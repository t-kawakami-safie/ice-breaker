export function request(ctx) {
  const { ingredients = [] } = ctx.args;

  const prompt = `Suggest a recipe idea using these ingredients : ${ingredients.join(
    ","
  )}.`;

  return {
    resourcePath: `/model/apac.anthropic.claude-3-sonnet-20240229-v1:0/invoke`,
    method: "POST",
    params: {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `自己開示につながるアイスブレイクの話題を三つ返して
                例えば人生の中で10番目の思い出、自分を数字に例えるならなど一風変わったものがよいです
                そして一人当たりの発表時間も考慮して、話題では3つ教えてとかではなく答えやすいシンプルな話題にしてほしい
                レスポンスはアプリでユーザーに表示するので1. 2. 3. の形式でトピックだけ返してほしい:`,
              },
            ],
          },
        ],
      },
    },
  };
}

export function response(ctx) {
  return {
    body: ctx.result.body,
  };
}
