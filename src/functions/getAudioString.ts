export function getAudioString(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = function read(e) {
      const audioString: string = JSON.stringify(e.target?.result);
      const { size } = new Blob([audioString]);
      if (size > 2500000)
        rej(
          new Error(
            'Uploaded sound is too large. Only sounds under 2MB can be stored.'
          )
        );
      else res(audioString);
    };
    reader.onerror = function (error) {
      rej(error);
    };
    reader.readAsDataURL(file);
  });
}
