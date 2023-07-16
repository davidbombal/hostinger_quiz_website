import openai

API_KEY = "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"
openai.api_key = API_KEY

# This is the latest model that is available.
model = "gpt-3.5-turbo"


res = openai.ChatCompletion.create(
    model=model,
    messages=[
    # Notice how you need to specify the role of the user and system in the conversation. You need to ask for less questions at a time.
        {"role": "system", "content" : "You are the examiner for CCNA exam"},
        {"role": "user", "content" : "Create 10 CCNA exam questions. It must be JSON formatted with question, option a, option b, option c, option d, correct answer, explanation."}
    ]
)

# I’m writing the json returned by chat-gpt api to a .json file which I’ll need to clean-up after the call.
with open("ccna-chatgpt.json", "w") as f:
    f.write(res["choices"][0]["message"]["content"])
