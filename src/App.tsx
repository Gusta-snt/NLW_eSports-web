import { useState, useEffect } from "react"
import axios from "axios"

import "./styles/main.css"
import logo from "./assets/logo.svg"

import GameBanner from "./components/GameBanner"
import CreateAdBanner from "./components/CreateAdBanner"
import CreateAdModal from "./components/CreateAdModal"
import * as Dialog from "@radix-ui/react-dialog"

interface Game {
  _id: string,
  title: string,
  bannerURL: string
  ads: number,
}

function App() {

  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios("http://localhost:3000/games")
      .then((apiGames) => {
        setGames(apiGames.data)
      })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logo} alt="Logo da NLW eSports" />
      <h1 className="text-6xl text-white font-black mt-20">Seu <span className="bg-nlw-gradient bg-clip-text text-transparent">duo</span> está aqui.</h1>
      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return (
            <GameBanner key={game._id} bannerURL={game.bannerURL} title={game.title} adsAmount={game.ads}/>
          )
        })}
      </div>
      <Dialog.Root>
        <CreateAdBanner/>
        <CreateAdModal/>
      </Dialog.Root>
    </div>
  )
}

export default App
