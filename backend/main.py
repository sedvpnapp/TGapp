import os
from fastapi import FastAPI, HTTPException
from dotenv import load_dotenv
from auth import verify_telegram_data

load_dotenv()

app = FastAPI()

@app.post("/auth/telegram")
def auth_telegram(initData: str):
    try:
        data = verify_telegram_data(
            initData,
            os.getenv("BOT_TOKEN")
        )
    except Exception:
        raise HTTPException(status_code=403, detail="Auth failed")

    return {
        "telegram_id": data["user"],
        "status": "ok"
    }