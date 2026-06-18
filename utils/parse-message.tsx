import React from "react";
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface InteractiveButtonProps {
    text: string;
    onSelect: (text: string) => void;
}

function InteractiveButton({ text, onSelect }: InteractiveButtonProps) {

    return (
        <button
            onClick={() => onSelect(text)}
            className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
        >
            {text}
        </button>
    )
}

//parse raw text and converts bracket notation into working React components.
export function parseMessageToJSX(text: string, onOptionClick: (text: string) => void): React.ReactNode {
    //Regex matches paragraphs, ### Headers, [Decision: ...], and [Advice: ...] patterns.
    const tokenRegex =/(\d+\.\s+\*\*[^*]+\*\*|\[CLICK:\s*([^\]]+)\]|\[COLLAPSIBLE:\s*\*\*([^*]+)\*\*\]([\s\S]*?)\[\/COLLAPSIBLE\])/gi
;
    const matches = text.match(tokenRegex) || [];

    return matches.map((token, index) => {
        const trimmed = token.trim();

        if (!trimmed) return null;

        if (trimmed.startsWith("[CLICK:")) {
            const questionText = trimmed.replace("[CLICK:", "").replace("]", "").trim();
            return (
                <InteractiveButton
                    key={index}
                    text={questionText}
                    onSelect={onOptionClick}
                />
            )
        }
        if (trimmed.startsWith("[COLLAPSIBLE:") ) {
            const regex = /\[COLLAPSIBLE:\s*(.*?)\s*\]([\s\S]*?)\[\/COLLAPSIBLE\]/;
            const match = trimmed.match(regex)
            if (match)
            return (
                <Collapsible key={index} className="rounded-md data-[state=open]:bg-muted">
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="group w-full">
                        <Markdown remarkPlugins={[remarkGfm]}>{match[1].trim()}</Markdown>
                    <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm">
                        <Markdown remarkPlugins={[remarkGfm]}>
                            {match[2].trim()}
                        </Markdown>
                </CollapsibleContent>
                </Collapsible>
            )
        }

        return <Markdown key={index} remarkPlugins={[remarkGfm]}>{trimmed}</Markdown>
    })
}
