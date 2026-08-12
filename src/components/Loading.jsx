const Loading = () => {
  return (
    <div className="loading-screen">

      <p className="loading-brand">
        VOUGHT INTERNATIONAL
      </p>

      <div className="loading-spinner"></div>

      <p className="loading-text">
        Loading
        <span className="loading-dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </p>

    </div>
  )
}

export default Loading