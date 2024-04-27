import { getStorage, ref, getDownloadURL } from "firebase/storage";

export async function getImageByURL(url: string) {
  const storage = getStorage();
  const linkRef = ref(storage, url);
  const url_link = await getDownloadURL(linkRef)
    .then((url) => {

      return url

    })
    .catch((error) => {
      console.log(error);
      // Handle any errors
    });

    return url_link
}
