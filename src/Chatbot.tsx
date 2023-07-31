import { Configuration, OpenAIApi } from 'openai';
import { useState } from 'react';
import { openai } from 'openai';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
const ChatBot = () => {
	const [message, setMessage] = useState("");
	const [chats, setChats] = useState([]);
	const [isTyping, setIsTyping] = useState(false);
	const chatData = fetch("/data/chat_data.json")
		.then(response => response.json())
		.then(data => {
			// Do something with the loaded JSON data
			return data;
		})
		.catch(error => {
			// Handle any errors that occurred during the fetch
			console.error("Error fetching JSON data:", error);
		});
	const APIKEY = import.meta.env.VITE_APIKEY;
	const fetchChatCompletion = async () => {
		const url = 'https://api.openai.com/v1/chat/completions';
		const headers = {
			'Authorization': `Bearer ${APIKEY}`,
			'Content-Type': 'application/json',
		};
		const data = {
			"model": "gpt-3.5-turbo-0613",
			"messages":
				[{ "role": "system", "content": "담신은 로플랫폼이라는 회사 홍보 전문가입니다. 회사 정보 외의 질문에는 답변하지 마세요." },
				{ "role": "user", "content": "로플랫폼은 뭐하는 곳이야" },
				{ "role": "assistant", "content": "컨썰의 운영사인 로플랫폼은 u-storyh zepeto, zep 등 다양한 메타버스 플랫폼을 활용하여 3d 가상공간을 운영합니다. 위치는 경기도 일산동구 장백로 204, 보림빌딩 302-303호입니다. 연락처는 031-932-9603 / FAX : 031-932-9605 입니다 " },
				{ "role": "user", "content": "로플랫폼에 대해서 말해줄래? 연락을 하고 싶어 " }]

		};
		try {
			const response = await axios.post(url, data, { headers });
			return response.data;
		} catch (error) {
			throw new Error('Failed to fetch chat completion');
		}
	};

	const { data, isLoading, isError } = useQuery({
		queryKey: ['ask'], queryFn: fetchChatCompletion
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error: Failed to fetch chat completion</div>;
	}

	// You can access the response data using the 'data' variable
	console.log(data);






	return (
		<div>
			This is chatbot api
		</div>
	);
};

export default ChatBot;
