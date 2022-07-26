import LoadingBar from '../../images/loading-bar.gif';
import './Loading.css'

const Loading = () => {
  return (
    <section className="looading-container">
        <h4 className="loading-text">Loading</h4>
        <img src={LoadingBar} alt="" className="loading-gif" />
    </section>
  )
}

export default Loading