import { useState } from 'react'

function AI() {
  const [aiInput, setAiInput] = useState('')

  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'السلام لك. كيف أقدر أساعدك اليوم؟',
    },
  ])

  function sendAiMessage() {
    const question = aiInput.trim()

    if (!question) return

    setMessages((oldMessages) => [
      ...oldMessages,
      {
        type: 'user',
        text: question,
      },
    ])

    setAiInput('')

    setTimeout(() => {
      setMessages((oldMessages) => [
        ...oldMessages,
        {
          type: 'bot',
          text: 'هذه إجابة تجريبية حالياً. لاحقاً سنربط المساعد الذكي بمصادر أرثوذكسية موثوقة.',
        },
      ])
    }, 800)
  }

  return (
    <div className="page-content" dir="rtl">
      <h1 className="page-title">🤖 المساعد الأرثوذكسي</h1>

      <p className="page-subtitle">
        اسأل عن الإيمان الأرثوذكسي من مصادر موثوقة
      </p>

      <div className="ai-chat">
        <div className="ai-body">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`ai-message ${message.type}`}
            >
              {message.type === 'bot' && (
                <div className="ai-avatar">✝</div>
              )}

              <div className="ai-bubble">
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <div className="chat-input-area">
          <input
            type="text"
            value={aiInput}
            placeholder="اكتب سؤالك هنا..."
            onChange={(e) => setAiInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendAiMessage()
              }
            }}
          />

          <button
            className="chat-send-btn"
            onClick={sendAiMessage}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  )
}

export default AI