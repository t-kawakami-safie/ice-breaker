"use client";

import React, { FormEvent, useState } from "react";
import { Card } from "@aws-amplify/ui-react";
import { generateRecipe } from "./actions";
import AddNames from "./components/addNames";
import Participants from "./components/participants";

export default function Home() {
  const [result, setResult] = useState<string>("");
  const [loading, setloading] = useState(false);
  const [names, setNames] = useState<string[]>([]);
  const [speaker, setSpeaker] = useState<string>("");
  const [spokenNames, setSpokenNames] = useState<string[]>([]);


  const onChangeSpeaker = () => {
    const candidates = names.filter(name => !spokenNames.includes(name));
    if (candidates.length === 0) {
      setSpeaker("終了！全員話し終わりました");
      return null; // 全員話し終わっている場合
    }

    // ランダムに1人選ぶ
    const picked = candidates[Math.floor(Math.random() * candidates.length)];

    // spokenNamesに追加
    setSpokenNames([...spokenNames, picked]);
    setSpeaker(picked);
  }

  const onAddName = (name: string) => {
    if (name.trim() !== "") {
      setNames([...names, name.trim()]);
    }
  }

  const onRemove = (nameToDelete: string) => {
    setNames(names.filter(name => name !== nameToDelete));
  };
  const onRemoveSpeaker = (nameToDelete: string) => {
    setSpokenNames(spokenNames.filter(name => name !== nameToDelete));
  };

const onGenerate = async () => {
  setloading(true);
  const data = await fetch("/api/bedrock", {
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Received data:", data.output.output.message.content[0].text);
      setResult(data.output.output.message.content[0].text);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  setloading(false);
  
};
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setloading(true);
    event.preventDefault();
    await onGenerate();
    

  };

  return (
    <div className="font-sans min-h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
  <main className="flex flex-row w-full">
    <div className="flex-1 bg-gray-800 rounded-2xl shadow-xl p-8 text-center mr-10">
        <h1 className="text-3xl font-bold text-white mb-8 mx-auto text-center">
          🚪 チェックイン テーマ
        </h1>

      <section className="mx-auto ">
        <form
          onSubmit={onSubmit}
          className=" p-4 flex flex-col items-center gap-4 mx-auto"
          >
          <button
            type="submit"
            className="font-bold text-white p-5 rounded-lg bg-blue-600 text-xl hover:bg-blue-700 transition-colors w-full"
            >
            話題を生成
          </button>
        </form>
      </section>
      {loading ? (
        <div className="flex flex-col items-center gap-4  mx-auto ">
          <h2 className="m-10 font-medium   text-xl text-blue-600 mx-auto ">
            Wait for it...
          </h2>

        </div>
      ) : (
        <div>
          {result ? (
            <section className="    mt-10 mx-auto  border border-black  bg-gray-50  rounded-xl     ">
              <Card className=" p-4 flex flex-col items-center gap-4 mx-auto text-xl  font-semibold    ">
                <h2 className="whitespace-pre-wrap">{result}</h2>
              </Card>
            </section>
          ) : null}
        </div>
      )}
      </div>
          <div className="flex-1 bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-2xl font-bold text-white mb-8 text-center">
          📝 参加者一覧
          <AddNames onAddName={onAddName} />
        </h1>
        <div className="flex">
            <div className="mr-5 bg-gray-700 p-3 rounded-xl w-1/2 text-white font-bold">
              参加者
              {names?.map((name, index) => (
                <Participants
                  name={name}
              onRemove={() => onRemove(name)}
              key={index}
              />
            ))}
            </div>
            <div className="mr-5 bg-gray-700 p-3 rounded-xl w-1/2 text-white font-bold">
              発表済み
              {spokenNames?.map((name, index) => (
                <Participants
                name={name}
                onRemove={() => onRemoveSpeaker(name)}
                key={index}
                />
              ))}
            </div>
          </div>
          <div className="mt-10 flex justify-center items-center gap-5 text-white">
            {speaker}
            <button onClick={onChangeSpeaker}
            className="ml-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl whitespace-nowrap">
              次の発表者
            </button>
          </div>
      </div>
    </main>
    </div>
  );
}
