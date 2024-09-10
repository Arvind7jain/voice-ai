let mediaRecorder;
let audioBlob;

document.getElementById('startRecord').onclick = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.start();

  mediaRecorder.ondataavailable = (e) => {
    audioBlob = e.data;
  };
};

document.getElementById('stopRecord').onclick = () => {
  mediaRecorder.stop();
  sendDataToServer();
};

async function sendDataToServer() {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'audio.wav');

  const response = await fetch('http://localhost:3000/audio/upload', {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();
  const audioUrl = URL.createObjectURL(
    new Blob([result.audio], { type: 'audio/wav' }),
  );
  document.getElementById('audioPlayback').src = audioUrl;
}
