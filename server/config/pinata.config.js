import { PinataSDK } from "pinata-web3";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.GATEWAY_URL,
});

export async function uploadFile(buffer, originalName, mimeType) {
  try {
    // Convert buffer to Blob
    const blob = new Blob([buffer], { type: mimeType });
    const file = new File([blob], originalName, { type: mimeType });

    // Upload file to Pinata
    const upload = await pinata.upload.file(file);
    return upload;
  } catch (error) {
    console.error("Pinata upload failed:", error);
    throw new Error("Failed to upload file to Pinata.");
  }
}
