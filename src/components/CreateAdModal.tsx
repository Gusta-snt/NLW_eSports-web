import * as Dialog from "@radix-ui/react-dialog"
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import {GameController, Check} from "phosphor-react"

import { useState, useEffect, FormEvent } from "react"
import axios from "axios"

import Input from "./Form/Input"

interface Game {
  _id: string,
  title: string,
}

function CreateAdModal() {

	const [games, setGames] = useState<Game[]>([])
	const [weekDays, setWeekDays] = useState<string[]>([])
	const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false)

	  useEffect(() => {
	    axios("http://localhost:3000/games")
	      .then((apiGames) => {
	        setGames(apiGames.data)
	      })
	  }, [])

	async function handleFormSubmit(e: FormEvent) {
		e.preventDefault()

		const formData = new FormData(e.target as HTMLFormElement)
		const data = Object.fromEntries(formData)
		
		if(!data){
			return
		}

		try{
			await axios.post(`http://localhost:3000/games/${data.game}/ads`, {
				name: data.name,
				yearsPlaying: Number(data.yearsPlaying),
				discord: data.discord,
				weekDays: weekDays.map(day => Number(day)),
				hourStart: data.hourStart,
				hourEnd: data.hourEnd,
				useVoiceChannel: useVoiceChannel
			})
			alert("Anúncio criado com sucesso!")
		}catch (err){
			alert("Erro ao criar o anúncio.")
			console.log(err)
		}
	}

	return (
		<Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed"/>
          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
            <Dialog.Title className="text-3xl text-white font-black">Publique um anúncio</Dialog.Title>
            <form onSubmit={handleFormSubmit} className="mt-8 flex flex-col gap-1">
              <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">Qual o game?</label>
                <select name="game" defaultValue="" className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500" id="game">
                	<option disabled value="">Selecione o game que deseja jogar</option>
                	{games.map((game) => {
                		return <option key={game._id} value={game._id}>{game.title}</option>
                	})}
                </select>
                
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="name"  className="font-semibold">Seu nome (ou nickname)</label>
                <Input name="name" type="text" id="name" placeholder="Como te chamam dentro do game?"/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying"  className="font-semibold">Joga há quantos anos?</label>
                  <Input name="yearsPlaying" type="number" id="yearsPlaying" placeholder="Tudo bem ser 0 :)"/>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="discord"  className="font-semibold">Qual é o seu discord?</label>
                  <Input name="discord" type="text" id="discord" placeholder="Usuário#000"/>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="weekDays"  className="font-semibold">Quando costuma jogar?</label>
                  <ToggleGroup.Root 
                  	type="multiple" 
                  	className="grid grid-cols-4 gap-1"
                  	value={weekDays}
                  	onValueChange={setWeekDays}
                  >
                    <ToggleGroup.Item
                      value="0"
                      className={`w-8 h-8 rounded ${weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"}`}
                      title="Domingo"
                    >D
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="1"
                      className={`w-8 h-8 rounded ${weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"}`}
                      title="Segunda"
                    >S
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="2" 
                      className={`w-8 h-8 rounded ${weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"}`}
                      title="Terça"
                    >T
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="3" 
                      className={`w-8 h-8 rounded ${weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"}`}
                      title="Quarta"
                    >Q
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="4" 
                      className={`w-8 h-8 rounded ${weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"}`}
                      title="Quinta"
                    >Q
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="5" 
                      className={`w-8 h-8 rounded ${weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"}`}
                      title="Sexta"
                    >S
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="6" 
                      className={`w-8 h-8 rounded ${weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"}`}
                      title="Sábado"
                    >S
                    </ToggleGroup.Item>
                   </ToggleGroup.Root>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="hourStart"  className="font-semibold">Qual horário do dia?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input name="hourStart" type="time" id="hourStart" placeholder="De:"/>
                    <Input name="hourEnd" type="time" id="hourEnd" placeholder="Até:"/>
                  </div>
                </div>
              </div>

              <label className="mt-2 flex gap-2 text-sm items-center">
                <Checkbox.Root className="w-6 h-6 rounded bg-zinc-900 p-1" onCheckedChange={setUseVoiceChannel} checked={useVoiceChannel}>
                	<Checkbox.Indicator>
                		<Check className="w-4 h-4 text-emerald-400"/>
                	</Checkbox.Indicator>
                </Checkbox.Root>
                Costumo me conectar ao chat de voz
              </label>
              <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close type="button" className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
                  Cancelar
                </Dialog.Close>
                <button type="submit" className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600">
                <GameController size={24}/>
                  Encontrar Duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
	)
}

export default CreateAdModal