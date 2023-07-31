import { Configuration, OpenAIApi } from "openai";

const addGpt = async (data) => {
	const configuration = new Configuration({
		organization: "org-lZFSHjIQprPHjRDEqR5mDxde",
		apiKey: "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",
	});
	const openai = new OpenAIApi(configuration);
	openai
		.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: [{ role: "user", content: "Hello" }],
		})
		.then((res) => {
			console.log(res.data.choices[0].message.content);
		})
		.catch((e) => {
			console.log(e);
		});

};

export default addGpt;
