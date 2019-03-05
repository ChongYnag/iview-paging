<template>
  <div class="transactions" style="margin:0 auto;width:80%">
    <i-datePicker
      type="daterange"
      split-panels
      placeholder="Select date"
      style="width: 200px;margin-bottom:20px"
      @on-change="selTime"
    ></i-datePicker>
    <i-table
      :columns="outCol"
      stripe
      :data="withPick.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      @on-sort-change="sortTable"
    ></i-table>
    <i-page
      style="margin-top:20px"
      :current="currentPage"
      :total="withPick.length"
      :page-size="pageSize"
      class="margin-top-20"
      @on-change="pageChange"
      @on-page-size-change="sizeChange"
      :page-size-opts="sizeOption"
      show-sizer
    ></i-page>
  </div>
</template>

<script>
import moment from "moment";
import { type } from "os";
export default {
  name: "Transactions",
  data() {
    return {
      content: true,
      currentPage: 1,
      pageSize: 5,
      secondData: [],
      sizeOption: [2, 5, 10],
      //table
      outCol: [
        {
          title: "Transaction Time",
          key: "time"
        },
        {
          title: "Video title",
          key: "title",
          filters: [
            {
              label: "大于5",
              value: "up"
            },
            {
              label: "小于5",
              value: "down"
            }
          ],
          filterMultiple: false,
          // 筛选
          filterRemote: (type, key) => {
            this.currentPage = 1;
            this.filterModifier = Object.assign({}, this.filterModifier, {
              [key]: {
                type: type[0],
                value: 5
              }
            });
          },
          sortable: "custom"
        },
        {
          title: "Real income",
          key: "price",
          filters: [
            {
              label: "大于9",
              value: "up"
            },
            {
              label: "小于9",
              value: "down"
            }
          ],
          filterMultiple: false,
          // 筛选
          filterRemote: (type, key) => {
            this.currentPage = 1;
            this.filterModifier = Object.assign({}, this.filterModifier, {
              [key]: {
                type: type[0],
                value: 9
              }
            });
          },
          sortable: "custom"
        },
        {
          title: "My income",
          filters: [
            {
              label: "大于6",
              value: "up"
            },
            {
              label: "小于6",
              value: "down"
            }
          ],
          filterMultiple: false,
          // 筛选
          filterRemote: (type, key) => {
            this.currentPage = 1;
            this.filterModifier = Object.assign({}, this.filterModifier, {
              [key]: {
                type: type[0],
                value: 6
              }
            });
          },
          key: "income"
        }
      ],
      time: "",
      column: "",
      type: "",
      outData: [
        {
          time: "2018/09/12",
          title: 1,
          price: "9 SNC",
          income: "4 SNC"
        },
        {
          time: "2018/09/12",
          title: 2,
          price: "2 SNC",
          income: "8 SNC"
        },
        {
          time: "2018/09/12",
          title: 3,
          price: "10 SNC",
          income: "8 SNC"
        },
        {
          time: "2018/09/12",
          title: 4,
          price: "10 SNC",
          income: "8 SNC"
        },
        {
          time: "2018/09/12",
          title: 5,
          price: "10 SNC",
          income: "8 SNC"
        },
        {
          time: "2018/09/12",
          title: 6,
          price: "10 SNC",
          income: "8 SNC"
        },
        {
          time: "2018/09/12",
          title: 7,
          price: "10 SNC",
          income: "8 SNC"
        },
        {
          time: "2018/09/12",
          title: "8",
          price: "10 SNC",
          income: "8 SNC"
        },
        {
          time: "2018/09/12",
          title: 9,
          price: "10 SNC",
          income: "8 SNC"
        },
        {
          time: "2018/09/13",
          title: 10,
          price: "10 SNC",
          income: "8 SNC"
        },
        {
          time: "2018/09/14",
          title: 11,
          price: "10 SNC",
          income: "8 SNC"
        },
        {
          time: "2018/09/15",
          title: 12,
          price: "10 SNC",
          income: "8 SNC"
        }
      ],
      filterModifier: {
        price: {
          type: ""
        },
        title: {
          type: ""
        },
        ["My income"]: {
          type: ""
        }
      }
    };
  },
  methods: {
    //前端时间搜索
    selTime: function(val) {
      this.time = val;
    },
    //排序比较
    compare: function(property, order) {
      if (order == "asc") {
        return function(a, b) {
          var value1 = parseInt(a[property]);
          var value2 = parseInt(b[property]);
          return value1 - value2;
        };
      } else if (order == "desc") {
        return function(a, b) {
          var value1 = parseInt(a[property]);
          var value2 = parseInt(b[property]);
          return value2 - value1;
        };
      }
    },
    //排序
    sortTable: function(column) {
      this.column = column;
    },
    pageChange: function(page) {
      this.currentPage = page;
    },
    sizeChange: function(size) {
      this.pageSize = size;
    },
    changeDate: function(val) {
      return moment(val).format("YYYY-MM-DD");
    }
  },
  mounted() {
    console.log(this);
  },
  computed: {
    // 时间筛选
    withTime() {
      let val = this.time;
      console.log(val)
      if (val[0] == '' || val == '') {
        console.log('none')
        return [...this.outData];
      } else {
        return this.outData.filter(
          item =>{
            return (this.changeDate(item.time) >= this.changeDate(val[0]) &&
            this.changeDate(item.time) <= this.changeDate(val[1]))
          }
        );
      }
    },
    // 排序
    withIncomeSort() {
      let column = this.column;
      if (column.order == "normal") {
        return this.withTime;
      } else {
        return [...this.withTime].sort(this.compare(column.key, column.order));
      }
    },
    // 条件筛选
    withPick() {
      const generator = key => {
        return item => {
          const type = this.filterModifier[key].type;
          const value = this.filterModifier[key]["value"];
          const mux = parseInt(item[key]) - value;
          return (
            !type || (mux > 0 && type == "up") || (mux < 0 && type == "down")
          );
        };
      };
      return Object.keys(this.filterModifier).reduce(
        (total, current) => total.filter(generator(current)),
        this.withIncomeSort
      );
    }
  }
};
</script>

<style scoped>
</style>
