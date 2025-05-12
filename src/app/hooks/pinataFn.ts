/* eslint-disable @typescript-eslint/no-explicit-any */
import { PinataSDK } from 'pinata'

// import Keccak from 'keccak'

// import { getFileFromImgSrc } from './fileFn';

const pinataGatewayURL = "white-tired-quokka-934.mypinata.cloud"

const pinata = new PinataSDK({
    pinataJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkODA3MWVmNi05MzI0LTQwOTYtYjQxMi02ZDczZjBhNjZiYTEiLCJlbWFpbCI6ImZlYWw5M0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYzY1M2ExNTZhOGQyZjY3NTVkZDMiLCJzY29wZWRLZXlTZWNyZXQiOiJmMzBlYTBjZTI2ZTEzZjAzZTRlMmE5ZGFhMzg4MjVmZDE4NzM1Mjg4NTJlN2VkNzExYjg4N2M2NWVhMjFjYzVjIiwiZXhwIjoxNzc4MzU0NzYxfQ.LSE1lmf6y62-8GDHRkU8vYCwDWx0sOikxVHSXm5E_II",
    pinataGateway: pinataGatewayURL
})

// export async function uploadFileSaved(imgSrc: any) {
//     try {
//         const fileResponse: any = await getFileFromImgSrc(imgSrc);
//         const file = fileResponse.file;
//         const hashHex = fileResponse.hash;

//         const upload = await pinata.upload.public.file(file)

//         // console.log(upload)
//         return { upload, hashHex }
//     } catch (error) {
//         console.error('Upload error:', error)
//         throw error
//     }
// }

export async function uploadImageStringFile(base64Data: string) {
    try {
        // console.log("base64imag:", base64Data);

        // Remove metadata from base64 string (e.g., "data:image/jpeg;base64,")
        const matches = base64Data.match(/^data:(.+);base64,(.+)$/)
        if (!matches || matches.length !== 3) {
            throw new Error('Invalid base64 image data')
        }

        const mimeType = matches[1];
        const base64 = matches[2];
        const buffer = Buffer.from(base64, 'base64');

        // Create a File object from the buffer
        const file = new File([buffer], 'image.png', { type: mimeType });

        // Upload using Pinata
        const upload = await pinata.upload.public.file(file);

        console.log('Upload success:', upload)
        return upload
    } catch (error) {
        console.error('Upload error:', error)
        throw error
    }
}


// export function hashJsonKeccak256(json: Record<string, any>): string {
//     const jsonString = JSON.stringify(json)
//     const buffer = Buffer.from(jsonString, 'utf8')
//     const hash = Keccak('keccak256').update(buffer).digest('hex')
//     return `0x${hash}`
// }

export async function uploadJsonToIPFS(data: Record<string, any>) {
    try {
        const upload = await pinata.upload.public.json(data)
        console.log('Upload success:', upload)
        return upload // contains IPFS hash, URL, etc.
    } catch (error) {
        console.error('Upload error:', error)
        throw error
    }
}
/* eslint-enable @typescript-eslint/no-explicit-any */
