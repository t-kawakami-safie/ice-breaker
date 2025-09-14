import { amplifyClient } from "./amplify-utils";

export async function generateRecipe(formData: FormData) {
  const response = await amplifyClient.queries.askBedrock({
    ingredients: [formData.get("ingredients")?.toString() || ""],
  });
  if (!response.data?.body) {
    alert("APIレスポンスが空です");
    return "";
  }

  let res;
  try {
    res = JSON.parse(response.data.body);
  } catch (e) {
    alert(`JSONパースエラー: ${e}`);
    return "";
  }

  if (res.content && Array.isArray(res.content) && res.content[0]?.text) {
    return res.content[0].text;
  } else if (res.message) {
    alert(res.message);
    return "";
  } else {
    alert("予期しないエラーです");
    return "";
  }
}