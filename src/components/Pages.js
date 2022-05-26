import Page from "./Page"
import useNavigate from '../hooks/useNavigate'
import { pagesData } from "../datas"

const pages = pagesData.pages

export default function Pages() {

  return (
    <div>
      {
        pages.map((page) => (
          < Page key={page.id} page={page} />
        ))
      }
    </div >
  )
}