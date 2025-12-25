import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename: string;
}

export function CodeBlock({ code, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-secondary/30 bg-black/80 mt-4 rounded-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-secondary/10 border-b border-secondary/30">
        <span className="font-mono text-sm text-secondary">{filename}</span>
        <button
          onClick={handleCopy}
          className="text-secondary hover:text-white transition-colors"
          title="Copy to clipboard"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-xs md:text-sm text-gray-300 whitespace-pre">
          {code}
        </pre>
      </div>
    </div>
  );
}
