import React, { useEffect } from 'react';
import IconifyIcon from '../IconifyIcon';
import { isBlob, isFile } from './fileupload';

interface FileRendererProps {
  file: File | Blob
  removeFile: (i: number) => void
  index: number
}

const Filetyperenderer: React.FC<FileRendererProps> = ({ file, removeFile, index }) => {
  useEffect(() => {
    if (isBlob(file)) {
      console.log("From Renderer", file)
    }
  }, [file])

  const viewFile = (file: File) => {
    const _file = URL.createObjectURL(file);
    window.open(_file, '_blank')
  }

  return (
    <div
      className=" aspect-square w-full h-full min-h-44 min-w-44  border rounded-md object-cover relative"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}

      {["image/jpeg", "image/jpg", "image/png"].includes(file.type) || isBlob(file) ?
        (
          <img
            onClick={()=>viewFile(file)}
            src={URL.createObjectURL(file)}
            alt=""
            className="min-h-40 min-w-40 cursor-pointer h-full w-full object-contain aspect-square"
          />
        ) :
        (
          isFile(file) && ["application/pdf"].includes(file.type) ?
            (
              <div onClick={()=>viewFile(file)} className='truncate flex flex-col cursor-pointer gap-2 items-center justify-center h-full w-full p-3'>
                <IconifyIcon className='!h-16 !w-16' fontSize="3.5rem" icon='vscode-icons:file-type-pdf2' />
                <abbr title={file.name} className='text-center text-decoration-none truncate text-gray-600 w-full'>{file.name}</abbr>
              </div>
            ) :
            (
              ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/csv"].includes(file.type) ?
                (
                  <div onClick={()=>viewFile(file)} className='truncate flex flex-col cursor-pointer gap-2 items-center justify-center h-full w-full p-3'>
                    <IconifyIcon className='!h-16 !w-16' fontSize="3.5rem" icon='vscode-icons:file-type-excel' />
                    <abbr title={file.name} className='text-center text-decoration-none truncate text-gray-600 w-full'>{file.name}</abbr>
                  </div>
                ) :
                (
                  <div onClick={()=>viewFile(file)} className='truncate flex flex-col cursor-pointer gap-2 items-center justify-center h-full w-full p-3'>
                    <IconifyIcon className='!h-16 !w-16 text-gray-500' fontSize="3.5rem" icon='basil:file-outline' />
                    <abbr title={file.name} className='text-center text-decoration-none truncate text-gray-600 w-full'>{file.name}</abbr>
                  </div>
                )
            )
        )
      }

      <div className="absolute top-1 right-1">
        <button onClick={() => { removeFile(index) }}>
          <svg
            className="text-red-700"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#ff0000"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM15.92 12.75H7.92C7.51 12.75 7.17 12.41 7.17 12C7.17 11.59 7.51 11.25 7.92 11.25H15.92C16.33 11.25 16.67 11.59 16.67 12C16.67 12.41 16.34 12.75 15.92 12.75Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Filetyperenderer;
