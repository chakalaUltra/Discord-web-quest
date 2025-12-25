import { useState } from "react";
import { CyberButton } from "@/components/CyberButton";
import { CyberCard } from "@/components/CyberCard";
import { CodeBlock } from "@/components/CodeBlock";
import { useFeedbackList, useCreateFeedback } from "@/hooks/use-feedback";
import { useToast } from "@/hooks/use-toast";
import { ShieldAlert, Zap, Cpu, Terminal, Download, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { z } from "zod";

// --- Extension File Content ---
const manifestJson = `{
  "manifest_version": 3,
  "name": "Discord Quest Bypass",
  "version": "1.0",
  "description": "Bypass Discord quests automatically.",
  "permissions": ["webRequest", "declarativeNetRequest", "storage"],
  "host_permissions": ["*://*.discord.com/*"],
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "matches": ["*://*.discord.com/*"],
      "js": ["content.js"]
    }
  ]
}`;

const backgroundJs = `// Background Service Worker
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (details.url.includes("quest/complete")) {
      console.log("Quest completion request intercepted");
      // Logic to spoof completion would go here
      return { cancel: false }; 
    }
  },
  { urls: ["*://*.discord.com/*"] },
  ["requestBody"]
);

console.log("Bypass Engine Loaded.");
`;

const contentJs = `console.log("Injecting Quest Bypass...");
// This script runs on the page context
setInterval(() => {
  const quests = document.querySelectorAll('[class*="questItem"]');
  quests.forEach(quest => {
    quest.style.border = "2px solid #00ff00";
    quest.setAttribute("data-bypassed", "true");
  });
}, 5000);
`;

export default function Home() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"install" | "source" | "feedback">("install");
  
  const { data: feedbackList } = useFeedbackList();
  const createFeedback = useCreateFeedback();

  const [formState, setFormState] = useState({ message: "", rating: 5 });

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.message.trim()) return;

    createFeedback.mutate(
      { message: formState.message, rating: formState.rating },
      {
        onSuccess: () => {
          toast({
            title: "TRANSMISSION SUCCESS",
            description: "Feedback uploaded to the mainframe.",
            className: "border-primary text-primary bg-black font-mono",
          });
          setFormState({ message: "", rating: 5 });
        },
        onError: (err) => {
          toast({
            title: "TRANSMISSION ERROR",
            description: err.message,
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <div className="min-h-screen text-foreground p-4 md:p-8 pb-32">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Section */}
        <header className="text-center space-y-4 pt-12 relative">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block relative"
          >
            <h1 className="text-5xl md:text-7xl font-display uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary animate-pulse">
              Quest<span className="text-white">_</span>Bypass
            </h1>
            <div className="absolute -inset-2 bg-primary/20 blur-xl -z-10 rounded-full opacity-50" />
          </motion.div>
          <p className="text-xl md:text-2xl font-mono text-secondary max-w-2xl mx-auto">
            SYSTEM_OVERRIDE_INITIATED // AUTOMATE YOUR REWARDS
          </p>
        </header>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 border-b border-primary/30 pb-8">
          {[
            { id: "install", label: "INSTALLATION", icon: Download },
            { id: "source", label: "SOURCE_CODE", icon: Terminal },
            { id: "feedback", label: "COMM_UPLINK", icon: MessageSquare },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                flex items-center gap-2 px-6 py-2 font-display text-lg tracking-wider transition-all duration-300 border-b-2
                ${activeTab === tab.id 
                  ? "border-primary text-primary text-shadow-glow bg-primary/10" 
                  : "border-transparent text-muted-foreground hover:text-secondary hover:border-secondary/50"}
              `}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">
          
          {/* INSTALL TAB */}
          {activeTab === "install" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <CyberCard title="INSTRUCTIONS" className="h-full" delay={0.1}>
                <div className="space-y-6 font-mono text-lg">
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded bg-primary/20 text-primary flex items-center justify-center font-bold border border-primary">1</div>
                    <div>
                      <h4 className="text-secondary font-bold mb-1">DOWNLOAD ARCHIVE</h4>
                      <p className="text-muted-foreground text-sm">Get the extension files. Since this is a web demo, copy the source code from the next tab into local files.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded bg-primary/20 text-primary flex items-center justify-center font-bold border border-primary">2</div>
                    <div>
                      <h4 className="text-secondary font-bold mb-1">ACCESS EXTENSIONS</h4>
                      <p className="text-muted-foreground text-sm">Navigate to <code className="bg-white/10 px-1 text-white">chrome://extensions</code> in your browser.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded bg-primary/20 text-primary flex items-center justify-center font-bold border border-primary">3</div>
                    <div>
                      <h4 className="text-secondary font-bold mb-1">DEVELOPER MODE</h4>
                      <p className="text-muted-foreground text-sm">Toggle "Developer mode" in the top right corner.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded bg-primary/20 text-primary flex items-center justify-center font-bold border border-primary">4</div>
                    <div>
                      <h4 className="text-secondary font-bold mb-1">LOAD UNPACKED</h4>
                      <p className="text-muted-foreground text-sm">Click "Load unpacked" and select the folder containing your files.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-dashed border-primary/30">
                  <div className="flex items-center gap-3 text-accent text-sm bg-accent/10 p-4 border border-accent/50 rounded">
                    <ShieldAlert className="w-6 h-6 shrink-0" />
                    <span>WARNING: Use at your own risk. This tool modifies browser requests. Compliance with TOS is user responsibility.</span>
                  </div>
                </div>
              </CyberCard>

              <div className="space-y-8">
                <CyberCard title="SYSTEM STATUS" delay={0.2}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/40 p-4 border border-white/10 text-center">
                      <div className="text-secondary text-2xl font-display font-bold">ONLINE</div>
                      <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Core Engine</div>
                    </div>
                    <div className="bg-black/40 p-4 border border-white/10 text-center">
                      <div className="text-primary text-2xl font-display font-bold">V1.0.4</div>
                      <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Version</div>
                    </div>
                    <div className="bg-black/40 p-4 border border-white/10 text-center col-span-2">
                      <div className="text-accent text-2xl font-display font-bold">UNDETECTED</div>
                      <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Stealth Mode</div>
                    </div>
                  </div>
                </CyberCard>
                
                <CyberCard title="CAPABILITIES" delay={0.3}>
                  <ul className="space-y-3 font-mono text-sm">
                    <li className="flex items-center gap-3">
                      <Zap className="w-4 h-4 text-accent" />
                      <span>Instant Quest Completion</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Cpu className="w-4 h-4 text-accent" />
                      <span>Background Processing</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <ShieldAlert className="w-4 h-4 text-accent" />
                      <span>Request Spoofing</span>
                    </li>
                  </ul>
                </CyberCard>
              </div>
            </div>
          )}

          {/* SOURCE CODE TAB */}
          {activeTab === "source" && (
            <div className="space-y-8">
              <CyberCard title="manifest.json" delay={0.1}>
                <p className="text-sm text-muted-foreground mb-2">Configuration file. Save as <code className="text-primary">manifest.json</code></p>
                <CodeBlock code={manifestJson} filename="manifest.json" />
              </CyberCard>

              <CyberCard title="background.js" delay={0.2}>
                <p className="text-sm text-muted-foreground mb-2">Service worker logic. Save as <code className="text-primary">background.js</code></p>
                <CodeBlock code={backgroundJs} filename="background.js" />
              </CyberCard>

              <CyberCard title="content.js" delay={0.3}>
                <p className="text-sm text-muted-foreground mb-2">Page injection script. Save as <code className="text-primary">content.js</code></p>
                <CodeBlock code={contentJs} filename="content.js" />
              </CyberCard>
            </div>
          )}

          {/* FEEDBACK TAB */}
          {activeTab === "feedback" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              <CyberCard title="TRANSMIT_DATA" delay={0.1}>
                <form onSubmit={handleSubmitFeedback} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-secondary tracking-widest">MESSAGE_CONTENT</label>
                    <textarea 
                      value={formState.message}
                      onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                      className="cyber-input h-32 resize-none"
                      placeholder="Enter operational report..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-secondary tracking-widest">SYSTEM_RATING</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button
                          type="button"
                          key={val}
                          onClick={() => setFormState(prev => ({ ...prev, rating: val }))}
                          className={`
                            w-10 h-10 border font-bold font-mono transition-all duration-200
                            ${formState.rating >= val 
                              ? "bg-primary text-black border-primary shadow-[0_0_10px_rgba(255,0,255,0.5)]" 
                              : "bg-transparent text-gray-500 border-gray-700 hover:border-gray-500"}
                          `}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>

                  <CyberButton 
                    type="submit" 
                    className="w-full"
                    isLoading={createFeedback.isPending}
                  >
                    INITIATE_UPLOAD
                  </CyberButton>
                </form>
              </CyberCard>

              <CyberCard title="INCOMING_TRANSMISSIONS" className="h-[600px] flex flex-col" delay={0.2}>
                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                  {feedbackList?.length === 0 && (
                    <div className="text-center text-muted-foreground py-10 font-mono">NO DATA FOUND</div>
                  )}
                  
                  {feedbackList?.map((item) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={item.id} 
                      className="bg-white/5 border border-white/10 p-4 relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-transparent" />
                      
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div 
                              key={i} 
                              className={`w-1 h-1 rounded-full ${i < item.rating ? "bg-secondary shadow-[0_0_5px_cyan]" : "bg-gray-800"}`} 
                            />
                          ))}
                        </div>
                        <span className="text-[10px] font-mono text-gray-500">
                          {new Date(item.createdAt || "").toLocaleDateString()}
                        </span>
                      </div>
                      
                      <p className="font-mono text-sm text-gray-300 break-words">{item.message}</p>
                    </motion.div>
                  ))}
                </div>
              </CyberCard>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
