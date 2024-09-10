import sys
import whisper
import warnings

def transcribe_audio(file_path):
    # Suppress warnings
    warnings.filterwarnings("ignore")
    
    try:
        model = whisper.load_model("base")
        result = model.transcribe(file_path)
        return result['text']
    except Exception as e:
        print(f"Error during transcription: {str(e)}", file=sys.stderr)
        return None

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python whisper_transcribe.py <audio_file_path>", file=sys.stderr)
        sys.exit(1)
    
    file_path = sys.argv[1]
    transcription = transcribe_audio(file_path)
    
    if transcription:
        print(transcription)
    else:
        sys.exit(1)