"use client"
import { useState } from "react"

import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
} from "recharts"
// import { useUpProvider } from "./upProvider"
// import { lkTest, setupWeb3, claimAIImage, getFee } from "@/actions/luksoFn"

// import styled from 'styled-components';
import LoadingFullScreen from "./LoadingFullScreen";
import { CharacteristicDescription } from "./CharacteristicDescription";

import { genImage } from "~~/hooks/openrouterFn";
import { uploadImageStringFile } from "~~/hooks/pinataFn";
import useNetworkConfig from "~~/hooks/useNetworkConfig";
import { CONTRACT_CHARACTERISTIC_PACKAGE_VARIABLE_NAME, EXPLORER_URL_VARIABLE_NAME } from "~~/config/network";

import {
  transactionUrl,
} from '~~/helpers/network'
import { useCurrentAccount } from "@mysten/dapp-kit";
import CustomConnectButton from "~~/components/CustomConnectButton";
import useTransact from "@suiware/kit/useTransact";
import { notification } from "~~/helpers/notification";
import { SuiSignAndExecuteTransactionOutput } from "@mysten/wallet-standard";
import useOwnNfts from "../hooks/useOwnNFTs";
import { prepareMintCharacteristicTransaction } from "../helpers/transactions";
import { ViewCharacteristic } from "./ViewCharacteristic";

const questions = [
  "I see myself as someone who is reserved.",
  "I see myself as someone who is generally trusting.",
  "I see myself as someone who tends to be lazy.",
  "I see myself as someone who is relaxed, handles stress well.",
  "I see myself as someone who has few artistic interests.",
  "I see myself as someone who is outgoing, sociable.",
  "I see myself as someone who tends to find fault with others.",
  "I see myself as someone who does a thorough job.",
  "I see myself as someone who gets nervous easily.",
  "I see myself as someone who has an active imagination.",
]

const reverseScored = new Set([0, 2, 3, 4, 6])

const traitMapping: any = {
  Extraversion: [0, 5],
  Agreeableness: [1, 6],
  Conscientiousness: [2, 7],
  Neuroticism: [3, 8],
  Openness: [4, 9],
}

// const Modal = styled.div<{ show: boolean }>`
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   background: white;
//   border-radius: 10px;
//   padding: 10px;
//   box-shadow: 0 8px 16px rgba(0,0,0,0.3);
//   z-index: 1000;
//   display: ${props => props.show ? 'block' : 'none'};
//   width: 300px;
//   color: black;
//   font-size: 13px;
// `;

// const Overlay = styled.div<{ show: boolean }>`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0,0,0,0.3);
//   z-index: 999;
//   display: ${props => props.show ? 'block' : 'none'};
// `;

export function Characteristic() {

  const [current, setCurrent] = useState(0)
  const [responses, setResponses] = useState<number[]>(Array(10).fill(3)) // Default middle value
  const [results, setResults] = useState<{ [key: string]: number } | null>(null)

  const [isViewed, setIsViewed] = useState<boolean>(false);

  const dataOwnNFTs = useOwnNfts()

  // const [fee, setFee] = useState(0);

  const [generatedImage, setGeneratedImage] = useState<string>("");

  const [loading, setLoading] = useState(false);

  const [notificationId, setNotificationId] = useState<string>()

  const imageKey = process.env.NEXT_PUBLIC_IMAGEROUTER_KEY;
  // console.log(imageKey);

  const currentAccount = useCurrentAccount()

  // const packageCharacterId = "0x8924b33cb3e35dcc09c88a8f3d3feec125f99db25c675c2d1ac134f15282141a";
  // const objectMintConfigId = "0x70b52b37bf719e8d6221986b3fce98f7a7b9178e4d2bb371a2df3140e2367950";

  const { useNetworkVariable } = useNetworkConfig()
  const packageCharacteristicId = useNetworkVariable(CONTRACT_CHARACTERISTIC_PACKAGE_VARIABLE_NAME)

  const explorerUrl = useNetworkVariable(EXPLORER_URL_VARIABLE_NAME)

  // const dataFee = useMintFee(objectMintConfigId);

  const { transact: mint } = useTransact({
    onBeforeStart: () => {
      const nId = notification.txLoading()
      setNotificationId(nId)
    },
    onSuccess: (data: SuiSignAndExecuteTransactionOutput) => {
      notification.txSuccess(
        transactionUrl(explorerUrl, data.digest),
        notificationId
      )
      dataOwnNFTs.refetch()
      // console.log("success");
      setIsViewed(true);
    },
    onError: (e: Error) => {
      notification.txError(e, null, notificationId)
    },
  })

  const handleSliderChange = (val: number) => {
    const updated = [...responses]
    updated[current] = val
    setResponses(updated)
  }

  const resetTest = () => {
    setCurrent(0);
    setResults(null);
    setGeneratedImage("");
    setResponses(Array(10).fill(3));
    setIsViewed(false);
  }

  const nextQuestion = async () => {
    if (current < 9) {
      setCurrent(current + 1)
    } else {
      await calculateResults()
    }
  }

  const prevQuestion = () => {
    if (current > 0) {
      setCurrent(current - 1)
    }
  }

  const calculateResults = async () => {
    setLoading(true);
    const scores: { [key: string]: number } = {}
    for (const trait in traitMapping) {
      const [q1, q2] = traitMapping[trait]
      const val1 = reverseScored.has(q1) ? 6 - responses[q1] : responses[q1]
      const val2 = reverseScored.has(q2) ? 6 - responses[q2] : responses[q2]
      scores[trait] = ((val1 + val2) / 2)
    }
    setResults(scores);

    await genImageAI(scores);
    // console.log(scores);

    setLoading(false);
  }

  // const genTestData = () => {
  //   // setResults({
  //   //   "Extraversion": 3,
  //   //   "Agreeableness": 3,
  //   //   "Conscientiousness": 3,
  //   //   "Neuroticism": 3,
  //   //   "Openness": 3
  //   // });

  //   // setGeneratedImage("https://ipfs.io/ipfs/bafkreibxz4lkopekdjzuic7dle4fib5vvnysl2grjxi4kgup2ml3h7fihm");
  //   // console.log("hello")
  //   // notification.txSuccess(
  //   //   "Hello",
  //   //   notificationId
  //   // )
  // }

  const genImageAI = async (scores: any) => {
    const prompt = `
        Create a bold, cartoon-style image of a fun anthropomorphic cake character with a playful face. Use thick outlines, vibrant flat colors, and a clean solid background. The cake should have expressive eyes, a quirky smile, and be decorated with candles, icing, and fun accessories like sunglasses or a hat.
        
        The character should reflect the following personality traits:
             - Extraversion: ${scores.Extraversion.toFixed(2)}
            - Agreeableness: ${scores.Agreeableness.toFixed(2)}
            - Conscientiousness: ${scores.Conscientiousness.toFixed(2)}
            - Neuroticism: ${scores.Neuroticism.toFixed(2)}
            - Openness: ${scores.Openness.toFixed(2)}
        
        Use visual metaphors or style adjustments to match these traits—e.g., more flamboyant if highly extraverted, more chaotic if high in neuroticism. No need to ask for preferences. Just generate the most visually fun and expressive result in a modern comic style suitable for a favicon.
        setLoading(false);
        `

    const response = await genImage(imageKey, prompt);

    // Get the base64 data from response
    const base64Data = response.data[0].b64_json;
    // Create the full data URL for the image
    const imageUrl = `data:image/jpeg;base64,${base64Data}`;

    // console.log(imageUrl);

    setGeneratedImage(imageUrl);
  }

  const uploadAndClaim = async (e: any) => {
    e.preventDefault();
    // console.log(await uploadImageStringFile(generatedImage));
    setLoading(true);


    const rsObj = await uploadImageStringFile(generatedImage);
    // console.log(rsObj);
    const cid = rsObj.cid;
    const imageUrl = "http://ipfs.io/ipfs/" + cid;
    mint(
      prepareMintCharacteristicTransaction(packageCharacteristicId, "MyCake", "My Cake Characteristic", imageUrl, fee)
    );

    setLoading(false);
  }

  const seeCakeIcon = () => {
    setIsViewed(true);
  }

  // useEffect(() => {
  //   genTestData();
  // }, []);

  // const mintData = useMintFee(objectMintConfigId)

  if (currentAccount == null) return <CustomConnectButton />

  if (dataOwnNFTs.isLoading) return <div>Still loading...</div>;

  const fee: any = 10000000;

  if (isViewed) return (<div>
    <button
      onClick={resetTest}
      className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-6 py-2 rounded-xl transition m-auto w-full"
    >
      {"Lets make the test →"}
    </button>
    <ViewCharacteristic></ViewCharacteristic>

    <button
      onClick={nextQuestion}
      className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-6 py-2 rounded-xl transition m-auto w-full"
    >
      {"Lets make the test →"}
    </button>
  </div>)

  return (
    <div className="max-w-md mx-auto p-2 text-center">

      {/* <button
        onClick={runTest}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Test
      </button> */}

      {/* <Overlay show={showModal} onClick={() => setShowModal(false)} />

      <Modal show={showModal}>
        {modalContent}
      </Modal> */}

      {loading && <LoadingFullScreen />}

      {!results ? (
        <>

          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-xl mx-auto mb-6">
            <p className="text-center text-lg font-medium text-gray-600 mb-2">
              Question <span className="text-pink-600 font-bold">{current + 1}</span> of 10
            </p>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-gradient-to-r from-pink-400 to-yellow-400 transition-all duration-300 ease-in-out"
                style={{ width: `${((current + 1) / 10) * 100}%` }}
              />
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-1">I see myself as someone who...</p>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">{questions[current]}</h2>

              <div className="flex justify-between text-xs text-gray-500 px-1 mb-1">
                <span>Strongly Disagree</span>
                <span>Strongly Agree</span>
              </div>
              <input
                type="range"
                min={1}
                max={5}
                value={responses[current]}
                onChange={(e) => handleSliderChange(Number(e.target.value))}
                className="w-full accent-pink-500"
              />
            </div>

            <div className="flex justify-between items-center mt-4">
              {current > 0 ? (
                <button
                  onClick={prevQuestion}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-5 py-2 rounded-xl transition"
                >
                  ← Back
                </button>
              ) : <button
                onClick={seeCakeIcon}
                className="bg-orange-200 hover:bg-orange-300 text-white-800 font-medium px-5 py-2 rounded-xl transition"
              >
                See Your Cake Icon
              </button>}

              <button
                onClick={nextQuestion}
                className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-6 py-2 rounded-xl transition"
              >
                {current === 9 ? "See Results" : "Next →"}
              </button>
            </div>
          </div>

        </>
      ) : (

        <div className="bg-white rounded-2xl shadow-md p-4 max-w-md mx-auto mt-6">
          <h2 className="text-2xl font-bold text-center text-pink-600 mb-4">🎯 Your Personality Radar</h2>
          <div className="flex items-center justify-between mb-4">
            <div className="w-1/2 flex justify-center">
              <ResponsiveContainer width={300} height={150}>
                <RadarChart
                  outerRadius={90}
                  data={Object.entries(results).map(([trait, score]) => ({
                    trait,
                    score: parseFloat(score.toFixed(2)),
                  }))}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="trait" tick={{ fontSize: 10 }} />
                  <PolarRadiusAxis angle={50} domain={[0, 5]} tick={{ fontSize: 10 }} />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#f472b6" // Tailwind pink-400
                    fill="#f472b6"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 flex flex-col items-center justify-center text-sm">
              {results && generatedImage && (
                <img
                  src={generatedImage}
                  alt="Generated Cake"
                  className="rounded-lg shadow-md object-cover mb-2"
                />
              )}
            </div>
          </div>

          <CharacteristicDescription scores={results} />


          <div className="grid grid-cols-1 gap-2 mt-4">
            {/* <button
              onClick={seeDescription}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl text-sm font-medium shadow"
            >
              See Description
            </button> */}
            <button
              onClick={uploadAndClaim}
              className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl text-sm font-medium shadow"
            >
              Claim AI Cake with {(parseFloat(fee) / 10 ** 9).toFixed(2)} SUI
            </button>
          </div>
        </div>

      )}
    </div>
  )
}
