<template>
  <div class="banner_section layout_padding">
    <div class="container">
      <div class="address_box">
        <div class="address_box_main">
          <div class="box_right">
            <h3 class="going_text">Tuyến đường(*)</h3>
            <form>
              <div class="form-group">
                <select class="form-control" id="" v-model="routeSelected">
                  <option value="">Chọn tuyến đường</option>
                  <option v-for="item in routes" :key="item._id" :value="item._id">
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </form>
          </div>

          <div class="box_right">
            <h3 class="going_text">Thời gian (7 ngày tới)</h3>
            <input type="text" :placeholder="displayDate" readonly />
          </div>
        </div>
      </div>
      <div class="search_bt">
        <a href="#" @click="fetchSearch()">Tìm kiếm</a>
      </div>

      <div class="address_box">
        <div class="address_box_main box-search">
          <div class="card w-100" v-for="schedule in schedules" :key="schedule._id">
            <div class="card-body">
              <img width="64" height="64" src="https://img.icons8.com/glyph-neue/64/bus--v1.png" alt="bus--v1" />
              <div class="card-content">
                <h3>{{ schedule.vehicleId.licensePlate }}</h3>
                <span>
                  Số ghế trống:
                  <strong>{{ schedule.availableSlot }}/{{ schedule.vehicleId.totalSlot }}</strong>
                </span>
                <span
                  >Giá vé: <strong>{{ convertPrice(schedule.routeId.price) }}</strong></span
                >
                <span
                  >Thời gian dự kiến: <strong>{{ convertEstimatedTime(schedule.routeId.estimatedTime) }}</strong></span
                >
              </div>
              <div class="card-content">
                <h3>{{ schedule.routeId.name }}</h3>

                <span>
                  Giờ xuất bến:
                  <strong>{{ formatDateFromTimestamp(schedule.startTime) }}</strong>
                </span>
                <span>
                  Giờ đến:
                  <strong>{{ formatDateFromTimestamp(schedule.endTime) }}</strong>
                </span>
              </div>
              <div class="card-content">
                <button type="button" class="btn btn-primary" @click="onSelectedSchedule(schedule)">Đặt vé</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-custom shadow" v-if="isCreateTicket">
        <div class="close-btn" style="float: right;" @click="onShowModal">X</div>
        <div class="card " style="border: none">
          <h3>Thông tin đặt vé</h3>
          <form>
            <!-- Email input -->
            <div class="form-outline mb-4">
              <input
                v-model="phoneNumber"
                class="form-control form-control-lg"
                placeholder="Nhập số điện thoại liên hệ"
              />
              <!-- <label class="form-label" for="form3Example3">Email address</label> -->
            </div>

            <!-- Password input -->
            <div class="form-outline mb-3">
              <input v-model="pickupLocation" class="form-control form-control-lg" placeholder="Nhập địa điểm đón" />
            </div>

            <div class="text-center text-lg-start mt-4 pt-2">
              <button
                @click="onCreateTicket"
                type="button"
                class="btn btn-primary btn-lg w-100"
                style="padding-left: 2.5rem; padding-right: 2.5rem"
              >
                Đặt vé
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { HOST_BOOKING_SERVICE } from "../../../services/getAPI";

export default defineComponent({
  components: {},
  data() {
    return {
      routeSelected: "",
      routes: [] as any,
      schedules: [] as any,
      phoneNumber: "",
      pickupLocation: "", // Địa điểm đón khách
      isCreateTicket: false,
      scheduleSelected: {} as any,
    };
  },
  computed: {
    dateNow() {
      const date = new Date();
      const dateConvert = this.convertDay(date);
      return {
        date,
        dateConvert,
      };
    },
    dateLastWeek() {
      const date = new Date();

      const dateConvert = this.convertDay(date.setDate(date.getDate() + 7));

      return {
        date,
        dateConvert,
      };
    },
    displayDate() {
      return this.dateNow.dateConvert + "-" + this.dateLastWeek.dateConvert;
    },
    timeSelected() {
      return {
        from: this.convertTimeStamp(this.dateNow.date),
        to: this.convertTimeStamp(this.dateLastWeek.date),
      };
    },

    storeUserInfo() {
      const storedUserInfo = localStorage.getItem("userInfo");
      return storedUserInfo ? JSON.parse(storedUserInfo) : {};
    },
  },
  mounted() {
    //
  },

  created() {
    this.fetchRoutes();
  },

  watch: {},
  methods: {
    convertDay(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    },
    convertTimeStamp(dateString) {
      // const date = new Date(dateString);
      return Math.floor(dateString.getTime() / 1000);
    },
    formatDateFromTimestamp(timestamp) {
      const date = new Date(timestamp * 1000);
      const day = ("0" + date.getDate()).slice(-2);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);
      return `${day}/${month}/${year} - ${hours}:${minutes}`;
    },
    convertEstimatedTime(timestamp) {
      const totalMinutes = Math.floor(timestamp / 60);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      if (hours > 0) {
        return `${hours} giờ ${minutes} phút`;
      } else {
        return `${minutes} phút`;
      }
    },

    convertPrice(price) {
      // Làm tròn giá thành số nguyên
      const roundedPrice = Math.round(price);
      // Sử dụng toLocaleString để thêm dấu phẩy
      return roundedPrice.toLocaleString();
    },

    async fetchRoutes() {
      try {
        const response = await fetch(`${HOST_BOOKING_SERVICE}/api/route`);
        if (!response.ok) {
          throw new Error("Failed to fetch route data");
        }

        const data = await response.json();
        this.routes = data;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchSearch() {
      try {
        const response = await fetch(
          `${HOST_BOOKING_SERVICE}/api/schedule?routeId=${this.routeSelected}&from=${this.timeSelected.from}&to=${this.timeSelected.to}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch route data");
        }

        const data = await response.json();
        this.schedules = data;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },

    onShowModal() {
      this.isCreateTicket = !this.isCreateTicket;
    },

    onSelectedSchedule(scheduleSelected) {
      this.scheduleSelected = scheduleSelected;
      this.onShowModal();
    },

    onCreateTicket() {
      fetch(`${HOST_BOOKING_SERVICE}/api/ticket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scheduleId: this.scheduleSelected._id,
          price: this.scheduleSelected.routeId.price,
          phoneContact: this.phoneNumber,
          pickupLocation: this.pickupLocation,
          customerId: this.storeUserInfo.id,
        }),
      })
        .then(() => {
          this.$toast.success("Đặt vé thành công.");
        })
        .catch(() => {
          this.$toast.error("Đặt vé thất bại, có lỗi xảy ra.");
        });
    },
  },
});
</script>

<style scoped>
.modal-custom {
  width: 600px;
  height: auto;
  position: fixed;
  top: 5em;
  left: 50%;
  transform: translateX(-50%);
  padding: 2em;
  background: white;
  z-index: 10000;
}
.modal-custom h3 {
  text-align: center;
  font-size: 2em;
  text-transform: uppercase;
}
.box-search {
  flex-wrap: wrap;
}
.card {
  margin-top: 1em;
}
img {
  width: 100px;
  margin-right: 3em;
}
.card-body {
  display: flex;
}
.card-content {
  margin-right: 5rem;
  display: flex;
  flex-direction: column;
}
input {
  padding: 0.75em;
  border: 1px solid #2b2278 !important;
  border-radius: 5px;
  width: 100%;
  font-weight: 600;
}

.close-btn {
  color: red;
}
.close-btn:hover {
  scale: 1.2;
  color: blue;
  cursor: pointer;
}
</style>
