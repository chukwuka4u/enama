"use client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
    Card,
    CardContent
} from "@/components/ui/card"
import { ArrowUp } from "lucide-react"
import { sendMessage } from "@/app/actions/chat"
import { useState } from "react"
import Markdown from 'react-markdown'
import remarkGfm from "remark-gfm"
import { parseMessageToJSX } from "@/utils/parse-message"

export default function Chat() {
    const [focused, setFocused] = useState<boolean>(false)
    const [messages, setMessages] = useState<{role: string, content: string}[]>([])
    const [newMessage, setNewMessage] = useState<{role: string, content: string}>({
        role: "user",
        content: ""
    })
    return (
        <div className="font-mono">
            {/* message array area */}
            <div className="pb-[100px] flex flex-col"> 
              {
                  messages.length == 0 ?
                (
                    <div className="text-center p-4">
                        <h3 className="md:text-[40px] md:font-bold font-semibold text-[30] leading-tight">What can I help you with?</h3>
                        <p className="text-xs text-gray-500">Ask a question, write code, or explore ideas.</p>
                    </div>  
                )
                : messages.map((message, index) => {
                    if (message.role === "assistant" && message != null) {
                        const parsedMessage = parseMessageToJSX(message.content, () => console.log("option clicked"))
                        return (
                            <Card className=" w-[80%] bg-gray-100 my-2" key={index}>
                                <CardContent className="">
                                    {parsedMessage}
                                </CardContent>
                            </Card>
                        )
                    }
                    return (
                        <Card className=" w-[60%] bg-gray-100 ml-auto my-2" key={index}>
                            <CardContent>
                                <Markdown remarkPlugins={[remarkGfm]}>{message.content}</Markdown>
                            </CardContent>
                        </Card>
                    )
                })
            }
            </div>
            <div className="fixed bottom-3 bg-slate-100 w-full max-w-[800px] rounded-md p-1">
                <Textarea placeholder="Ask anything..."
                    onFocus={() => setFocused(true)}
                    value={newMessage.content}
                    onChange={(e) => setNewMessage({
                        role: "user",
                        content: e.target.value
                    })}
                    className={`relative resize-none mb-4 ${focused ? "h-[150px]" : "h-[50px]"}`}
                />
                <div className="absolute bottom-10 right-5">
                    <Button variant="outline"
                        className="max-md:hover:none"
                        disabled={newMessage.content === ""}
                        onClick={() => {
                            // adds the users {role; content} to messages
                            setMessages([...messages, newMessage])
                            // send the message to the api and get response
                            sendMessage([...messages, newMessage]).then((response) => 
                                {
                                    setMessages([...messages, newMessage, {
                                    role: "assistant",
                                    content: response,
                                    }])
                                    setFocused(false)
                                    setNewMessage({...newMessage, content: ""})
                                }
                            )
                        }
                        }
                    >
                        <ArrowUp className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}