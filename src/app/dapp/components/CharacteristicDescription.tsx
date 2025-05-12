"use client";

import { callOpenRouter } from "~~/hooks/openrouterFn";
import { useEffect, useState } from "react";
import LoadingFullScreen from "./LoadingFullScreen";

export function CharacteristicDescription(params: any) {

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // console.log(process.env.NEXT_PUBLIC_OPENROUTER_KEY)

  // const keyList = (process.env.NEXT_PUBLIC_OPENROUTER_KEY || "").split(",");

  // console.log("keyList")
  // console.log(keyList);

  const init = async () => {
    // console.log("init");
    setLoading(true);
    const scores = params.scores;

    const prompt = `
        Based on the following Big Five personality trait scores, please write a short paragraph summarizing this person's personality in a friendly and insightful tone.

        - Extraversion: ${scores.Extraversion.toFixed(2)}
        - Agreeableness: ${scores.Agreeableness.toFixed(2)}
        - Conscientiousness: ${scores.Conscientiousness.toFixed(2)}
        - Neuroticism: ${scores.Neuroticism.toFixed(2)}
        - Openness: ${scores.Openness.toFixed(2)}

        Use simple language and aim for 2 sentences. Highlight the most distinctive traits and how they might influence the person’s interactions or mindset.
  `

    try{
      const response = await callByKeyRandomly(prompt);
      // console.log(response);
      const personalitySummary = response.choices[0]?.message?.content;
      setContent(personalitySummary);
    }catch(e) {
      console.log(e);
    }

    setLoading(false);
  }

  const callByKeyRandomly = async (content: any) => {

    const selectedKey = process.env.NEXT_PUBLIC_CEREBRAS_KEY;

    return await callOpenRouter(selectedKey, "user", content)
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="p-1">
  {loading && <LoadingFullScreen />}

  {!loading && (
    <div className="bg-white rounded-2xl shadow-lg p-1 transition-all duration-500 ease-in-out border border-pink-100">
      {/* <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">🧁 Your Personality in Cake Form</h2> */}
      <p className="text-gray-700 text-md leading-relaxed">
        {content}
      </p>
    </div>
  )}
</div>
  );
}
