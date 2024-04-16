import { getStorage, ref, getDownloadURL } from "firebase/storage";

export function getImageByURL(url: string) {
  const storage = getStorage();
  const linkRef = ref(storage, url);
  getDownloadURL(linkRef)
    .then((url) => {
      // `url` is the download URL for 'images/stars.jpg'

      // Or inserted into an <img> element
      const img = document.getElementById("myimg");
      if (img) {
        img.setAttribute("src", url);
      }
    })
    .catch((error) => {
      console.log(error);
      // Handle any errors
    });
}
