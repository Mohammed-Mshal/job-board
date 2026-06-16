import ImageKit from 'imagekit'

const imageKit = new ImageKit({
    publicKey: process.env.Image_Kit_PublicKey as string,
    privateKey: process.env.Image_Kit_PrivateKey as string,
    urlEndpoint: process.env.Image_Kit_UrlEndpoint as string
})
export default imageKit