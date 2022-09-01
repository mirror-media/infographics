import LoadingGif from '../assets/loading.gif'
import { StyledLoading } from '../styles/LoadingStyles'

function Loading() {
  return (
    <StyledLoading>
      <div className="loading">
        <div className="image">
          <img src={LoadingGif} alt="loading" />
        </div>
        <p className="text-one">載入中，請稍候</p>
        <p className="text-two">（建議關閉手機「省電模式」以獲得最佳體驗）</p>
      </div>
    </StyledLoading>
  )
}

export default Loading
