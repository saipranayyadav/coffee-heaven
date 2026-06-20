function Register() {
  return (
    <div className="form-page">

      <form className="form-box">

        <h1>Customer Entry ☕</h1>

        <input
          type="text"
          placeholder="Customer Name"
        />

        <input
          type="text"
          placeholder="Phone Number"
        />

        <select>

          <option>Select Table Number</option>

          <option>Table 1</option>
          <option>Table 2</option>
          <option>Table 3</option>
          <option>Table 4</option>
          <option>Table 5</option>
          <option>Table 6</option>
          <option>Table 7</option>
          <option>Table 8</option>
          <option>Table 9</option>
          <option>Table 10</option>

        </select>

        <button>Start Ordering</button>

      </form>

    </div>
  );
}

export default Register;