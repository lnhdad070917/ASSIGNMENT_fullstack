import React, { useState } from "react";
import { Icon } from "@iconify/react";
import "./App.css";

function App() {
  const [penilaian, setPenilaian] = useState({});
  const [displayPenilaian, setDisplayPenilaian] = useState(null);
  const mahasiswa = Array.from({ length: 10 }, (_, index) => ({
    nama: `mahasiswa ${index + 1}`,
    nilai: `mahasiswa_${index + 1}`,
  }));

  const handleSimpan = () => {
    const newPenilaian = { ...penilaian };

    for (let i = 0; i < 4; i++) {
      const aspekPenilaian = {};

      mahasiswa.forEach((mahasiswaItem, index) => {
        const selectElement = document.getElementById(
          `aspek_${i + 1}_${index}`
        );
        if (selectElement) {
          aspekPenilaian[mahasiswaItem.nilai] = parseInt(selectElement.value);
        }
      });

      newPenilaian[`aspek_penilaian_${i + 1}`] = aspekPenilaian;
    }

    console.log(newPenilaian);
    setPenilaian(newPenilaian);
    setDisplayPenilaian(newPenilaian);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            {Array.from({ length: 4 }, (_, i) => (
              <th key={i}>Aspek penilaian {i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mahasiswa.map(function (item, index) {
            return (
              <tr key={index} className="mahasiswa">
                <td className="nama">
                  <Icon icon="ion:person-circle-sharp" width={27} /> {item.nama}
                </td>
                {Array.from({ length: 4 }, (_, i) => (
                  <td key={i}>
                    <select
                      id={`aspek_${i + 1}_${index}`}
                      name={`aspek_${i + 1}_${index}`}
                    >
                      {Array.from({ length: 10 }, (_, j) => (
                        <option key={j + 1} value={j + 1}>
                          {j + 1}
                        </option>
                      ))}
                    </select>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="button">
        <button onClick={handleSimpan}>Simpan</button>
      </div>
      {displayPenilaian && (
        <div className="penilaian">
          <pre>{JSON.stringify(displayPenilaian, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
