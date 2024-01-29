<template>
  <div class="controller">
    <label> Enter the order of the matrix: </label>
    <label class="error-message" v-if="err">{{ "maximum number is 14" }}</label>
    <input
      id="order"
      type="number"
      placeholder="Enter order"
      v-model.trim.lazy="TemporderOfMatrix"
    />
    <div class="button">
      <button class="generate" @click="generateInput">Generate Input</button>
      <button class="cal" @click="cal">Calculate</button>
    </div>
  </div>

  <div class="inp" v-if="orderOfMatrix > 0 && numberColum > 0">
    <table>
      <tbody>
        <tr v-for="(row, i) in array" :key="i">
          <td v-for="(col, j) in row" :key="j">
            <input
              type="text"
              :ref="`input_${i}_${j}`"
              :id="`col-${i}-${j}`"
              :value="col"
              @keydown="navigateTable($event, i, j)"
              @input="updateArrayValue($event, i, j)"
              style="width: 50px; height: 20px"
              @focus="onInputFocus($event)"
            />

            <span
              v-if="j != array.length"
              style="font-family: MJI; color: black"
            >
              x<sub style="font-family: MJI; color: black">
                {{ j + 1 }}
              </sub>
            </span>

            <span
              v-if="j < array.length - 1"
              style="font-family: MJI; color: black"
            >
              +
            </span>
            <span
              v-if="j == array.length - 1"
              style="font-family: MJI; color: black"
            >
              =
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal">
      <div class="button-container">
        <button
          type="button"
          class="close"
          aria-label="Close"
          @click="closeModal"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <span
        class="result"
        style="color: black; font-size: large; font-weight: bold"
      >
        {{ "The Result is : " }}<br />
        <span
          v-for="(index, j) in result"
          :key="index"
          style="font-family: MJI; color: black"
        >
          x<sub style="font-family: MJI; color: black">
            {{ j + 1 }}
          </sub>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import refs

export default {
  data() {
    return {
      orderOfMatrix: 2,
      numberColum: 2,
      TemporderOfMatrix: 2,
      array: null,
      result: null,
      arrowKeys: ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"],
      err: false,
      showModal: false,
    };
  },

  methods: {
    searchAction() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    navigateTable(event, rowIndex, colIndex) {
      const key = event.key;
      console.log(key);

      switch (key) {
        case "ArrowUp":
          this.moveFocus(rowIndex - 1, colIndex);
          break;
        case "ArrowDown":
          this.moveFocus(rowIndex + 1, colIndex);
          break;
        case "ArrowLeft":
          this.moveFocus(rowIndex, colIndex - 1);
          break;
        case "ArrowRight":
          this.moveFocus(rowIndex, colIndex + 1);
          break;
      }
    },
    moveFocus(rowIndex, colIndex) {
      if (
        rowIndex >= 0 &&
        rowIndex < this.orderOfMatrix &&
        colIndex >= 0 &&
        colIndex < this.orderOfMatrix + 1
      ) {
        try {
          this.$refs[`input_${rowIndex}_${colIndex}`][0].focus();
        } catch (e) {
          console.log(e);
        }
      }
    },
    generateInput() {
      if (this.TemporderOfMatrix > 14) {
        this.err = true;
        return;
      } else {
        this.err = false;
      }
      this.orderOfMatrix = this.TemporderOfMatrix;
      this.numberColum = this.TemporderOfMatrix + 1;
      this.array = Array.from({ length: this.orderOfMatrix }, () =>
        Array(this.numberColum).fill(0)
      );
      console.log(this.array);

      console.log(this.orderOfMatrix);
    },
    updateArrayValue(event, rowIndex, colIndex) {
      // Update the array value when the input changes.
      this.array[rowIndex][colIndex] = event.target.value;
      console.log(this.array[rowIndex][colIndex]);
      console.log(this.array);
    },

    onInputFocus(event) {
      // This method is called when the input gains focus.
      // You can add any logic to change the style here.
      // For example, remove the value.
      // Set the value to an empty string.
      const inputElement = event.target;
      if (parseFloat(inputElement.value) == 0) {
        inputElement.value = "";
      }

      // if(event.target.value=='0')event.target.value = "";
    },

    async cal() {
      // this.showModal = true;

      console.log(this.array);
      // const arr = this.array;

      const arr = [
        [151, 515, 62, 65],
        [121, 6, 6, 6],
        [14, 45, 3, 2],
      ];
      console.log(arr);

      try {
        const response = await axios.post(
          "http://localhost:8081/api/cal  ",
          arr
        );

        console.log(response);
        this.result = response.data.result;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
input {
  border: 2px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #f8f8f8;
  font-size: 13px;
  resize: none;
  padding: 10px;
}
.inp {
  margin-top: 20px;
  position: relative;
  max-height: 80vh;
  max-width: 150vh;
  overflow: auto;
  /* z-index: 1; */
}

#order {
  margin-top: 60px;
  margin-left: 20px;

  border: 2px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #f8f8f8;
  font-size: 16px;
  resize: none;
  padding: 10px;
}
label {
  margin-left: 30px;
  color: blue;
}
.error-message {
  color: red;
  margin-left: 30px;
  font-size: 20px;
  font-weight: bold;
}
.generate,
.cal {
  margin-left: 20px;
  margin-top: 20px;
  background-color: #0f209b; /* Green */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

.cal {
  margin-right: 30vh;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent overlay */
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  position: relative;
  max-height: 80vh; /* Set a maximum height */
  overflow-y: auto;
  background: white;
  width: 60%;
  height: auto;
  margin-top: 20px;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(15, 14, 14, 0.3);
}

.button-container {
  position: absolute;
  top: 2px;
  right: 2px;
  background: #0f209b;
  /* margin: 0; */
  /* padding: 0; */
}
.close {
  color: rgb(206, 8, 11);
  font-size: 20px;
  font-weight: bold;
}
.close:hover .button-container {
  background-color: rgb(208, 4, 4);
  /* font-size: 20px; */
  /* font-weight: bold; */
}
</style>
