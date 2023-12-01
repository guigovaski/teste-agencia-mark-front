import JoditEditor from "jodit-react";
import { useMemo, useRef, useState } from "react";

type Props = {
	placeholder: string; 
	messageContent: string;
	setMessageContent: (value: string) => void;
}

export const Editor = ({ placeholder, messageContent, setMessageContent }: Props) => {
	const config = useMemo(() => {
    return {
      readonly: false,		
      placeholder: placeholder || "Something"
    }
    
  }, [placeholder]);

	return (
		<JoditEditor
			value={messageContent}
			config={config}
			onBlur={newContent => setMessageContent(newContent)}		
		/>
	);
};