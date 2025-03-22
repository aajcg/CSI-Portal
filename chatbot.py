import os
import json
import google.generativeai as genai
from dotenv import load_dotenv
from rapidfuzz import process, fuzz  

# ✅ Load API key from .env file
load_dotenv()
api_key = os.getenv("API_KEY")
if not api_key:
    raise ValueError("❌ API key not found. Set API_KEY in your environment variables!")

# ✅ Configure Gemini API
genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-1.5-flash")

# ✅ Load JSON Data
def load_data():
    try:
        with open(r"C:\Users\Abhilove Goyal\Desktop\C++\CHATBOTT\CSI.json", "r", encoding="utf-8") as file:
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError) as e:
        print(f"❌ Error loading CSI.json: {e}")
        return {}

data = load_data()

def fetch_answer(user_query):
    """Find the most relevant answer using fuzzy matching."""
    user_query = user_query.lower()
    questions_answers = []

    for category, faqs in data.items():
        if isinstance(faqs, list):
            for faq in faqs:
                if isinstance(faq, dict) and "question" in faq and "answer" in faq:
                    questions_answers.append((faq["question"], faq["answer"]))

    # ✅ Use fuzzy matching to find the closest question
    if questions_answers:
        best_match, score, index = process.extractOne(user_query, [q[0] for q in questions_answers], scorer=fuzz.partial_ratio)
        if score > 70:  # Adjust threshold as needed
            return questions_answers[index][1]

    return None  # No relevant match found

# ✅ Chatbot Function
def chatbot(user_input):
    """Generate AI responses based on user input and relevant FAQ data."""
    relevant_info = fetch_answer(user_input)

    if relevant_info:
        return relevant_info  # Directly return the stored answer

    # Fallback response when no answer is found
    return "Sorry, I didn't get that. But if you need further assistance, you can contact [Name] at [Email] or call [Phone Number]."

# ✅ Run chatbot in CLI mode
if __name__ == "__main__":
    print("Bot: Hi, How may I help you?")
    while True:
        user_query = input("User: ")
        if user_query.lower() in ["exit", "quit"]:
            print("Exiting chatbot...")
            break
        print("Bot:", chatbot(user_query))
