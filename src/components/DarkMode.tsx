import { useState } from 'react';
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/20/solid'
// import { useGuitarStore } from '../store';
import { useAppStore } from '../stores/useAppStore';

const Icons = [
    {
        id: 1,
        name: "Modo Claro",
        icon: <SunIcon className='text-black w-8 h-8'/>
    },
    {
        id: 2,
        name: "Modo Oscuro",
        icon: <MoonIcon className='text-black w-8 h-8'/>
    },
    {
        id: 3,
        name: "Sistema",
        icon: <ComputerDesktopIcon className='text-black w-8 h-8'/>
    }
]


const DarkMode = () => {

    const [icon, setIcon] = useState(3)

    const toogleDarkMode = useAppStore(state => state.toogleDarkMode)
  
    const handleClick = (id : number) => {      
        if (id === 1) {
            toogleDarkMode(false)
            document.documentElement.classList.remove('dark');
        } else if (id === 2) {
            toogleDarkMode(true)
            document.documentElement.classList.add('dark');
        } else if (id === 3) {
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (systemPrefersDark) {
                document.documentElement.classList.add('dark');
                toogleDarkMode(true)
            } else {
                document.documentElement.classList.remove('dark');
                toogleDarkMode(false)
            }
        }
    };

  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 rounded-lg">
        {icon == 1 ? (
            <SunIcon className='w-8 h-8 text-white ' />
        ) : icon == 2 ? (
            <MoonIcon className='w-8 h-8 text-white ' />
        ) : (
            <ComputerDesktopIcon className='w-8 h-8 text-white ' />
        )}
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-min -translate-x-3/4  lg:-translate-x-48">
          <div className="w-56 shrink rounded-xl bg-white p-2 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
            {Icons.map(icon => (
                <button
                    key={icon.id}
                    className='block w-full'
                    type='button'
                    onClick={() => {
                        handleClick(icon.id)
                        setIcon(icon.id)
                    }}
                >
                    <div className=' flex gap-3 items-center hover:bg-orange-400/30 w-full p-2 rounded-lg'>
                        {icon.icon}
                        {icon.name}
                    </div>
                </button>
            ))}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

export default DarkMode