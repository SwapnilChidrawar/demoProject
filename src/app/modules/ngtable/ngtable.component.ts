import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgtableService } from './ngtable.service';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ngtable',
  templateUrl: './ngtable.component.html',
  styleUrls: ['./ngtable.component.scss'],
  providers: [NgbDropdownConfig],
  encapsulation: ViewEncapsulation.None
})
export class NgtableComponent implements OnInit {
    rows = [];
    editing = {};
    temp = [];

    queryString = '';
    queryStringArray = [];

    columns = [
    { name: 'id', dataType: 'number' },
    { name: 'name', dataType: 'string' },
    { name: 'username', dataType: 'string' },
    { name: 'email', dataType: 'string' }
    ];

    filterKeys = [];
    // filters = ['Match', 'UnMatch', 'Starts With', 'Ends With'];
    filters = [
      {key : 'match' , value : 'Match'},
      {key : 'unmatch' , value : 'UnMatch'},
      {key : 'startsWith' , value : 'Starts With'},
      {key : 'endsWith' , value : 'Ends With'},
    ];

    booleanFilters = [
      {key : 'all', value : 'All'},
      {key : 'true', value : 'True'},
      {key : 'false', value : 'False'}
    ];

    numberFilters = [
      {key : 'equal', value : 'Equal'},
      {key : 'notEqual', value : 'Not Equal'},
      {key : 'lessThan', value : 'Less Than'},
      {key : 'greaterThan', value : 'Greater Than'},
      {key : 'lessThanEqualTo', value : 'Less Than Equal To'},
      {key : 'greaterThanEqualTo', value : 'Greater Than Equal To'}
    ];

    inputFieldValue = '';
  constructor(private ngTableService: NgtableService,
              private config: NgbDropdownConfig) {
                config.placement = 'bottom-left';
                config.autoClose = 'outside';
               }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.ngTableService.getHttpData().subscribe((data) => {
      for (const row of data) {
        row.height = Math.floor(Math.random() * 80) + 50;
      }
      this.rows = data;
      this.temp = data;
    });
  }

  getRowHeight(row) {
    return row.height;
  }

  onSubmit(formData: NgForm, colIndex: number) {
    const searchKey = formData.controls.inputFieldValue.value;
    const filterKey = formData.controls.radio.value;
    this.updateFilter(searchKey, colIndex, filterKey);
    this.buildSearchQuery(searchKey, colIndex, filterKey);

  }

  buildSearchQuery(searchKey, colIndex, filterKey) {
    for (const query of this.queryStringArray) {
      if (query.indexOf(this.columns[colIndex].name) !== -1) {
        this.queryStringArray.splice(this.queryStringArray.indexOf(query), 1);
      }
    }
    if (searchKey !== '') {
      this.queryStringArray.push( this.columns[colIndex].name  + '=' + filterKey + '%' + searchKey);
    }

    this.queryString = '?' + this.queryStringArray.join('&');
    console.log(this.queryString);
  }
  updateFilter(searchKey, colIndex, filterKey) {

      // Check if the operation is for string data type
      if (this.columns[colIndex].dataType === 'string') {
        const val = searchKey.toLowerCase();
        const filterIndex = this.filters.findIndex(p => p.key === filterKey);

        this.filterStringData(val, colIndex, filterIndex);
      }
      // Check if the operation is for number data type
      if (this.columns[colIndex].dataType === 'number') {
        const filterIndex = this.numberFilters.findIndex(p => p.key === filterKey);

        this.filternumberData(searchKey, colIndex, filterIndex);
      }
  }

  filterStringData(val, colIndex, filterIndex) {
    const val1 = this.columns[colIndex].name;

    // For Match filter
    if ( this.filters[filterIndex].key === this.filters[0].key) {
      const temp = this.temp.filter(function(d) {
        return d[val1].toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.rows = temp;
      const filterkeyEntry = val1 + ':' + this.filters[filterIndex].key + ':' + val;
      for (let i = 0 ; i < this.filterKeys.length ; i++) {
        if (this.filterKeys[i].indexOf(this.columns[colIndex].name + ':' + this.filters[filterIndex].key) !== -1) {
          this.filterKeys.splice(i, 1);
        }
      }
    } /* For Unmatch Filter */ else if (this.filters[filterIndex].key === this.filters[1].key) {
      const temp = this.temp.filter(function(d) {
        return d[val1].toLowerCase().indexOf(val) === -1 || !val;
      });
      this.rows = temp;
      const filterkeyEntry = val1 + ':' + this.filters[filterIndex].key + ':' + val;
      for (let i = 0 ; i < this.filterKeys.length ; i++) {
        if (this.filterKeys[i].indexOf(this.columns[colIndex].name + ':' + this.filters[filterIndex].key) !== -1) {
          this.filterKeys.splice(i, 1);
        }
      }
    } /* For Starts with Filter */ else if (this.filters[filterIndex].key === this.filters[2].key) {
      const temp = this.temp.filter(function(d) {
        return d[val1].toLowerCase().startsWith(val) || !val;
      });
      this.rows = temp;
      const filterkeyEntry = val1 + ':' + this.filters[filterIndex].key + ':' + val;
      for (let i = 0 ; i < this.filterKeys.length ; i++) {
        if (this.filterKeys[i].indexOf(this.columns[colIndex].name + ':' + this.filters[filterIndex].key) !== -1) {
          this.filterKeys.splice(i, 1);
        }
      }
    } /* For Ends with Filter */ else if (this.filters[filterIndex].key === this.filters[3].key) {
      const temp = this.temp.filter(function(d) {
        return d[val1].toLowerCase().endsWith(val) || !val;
      });
      this.rows = temp;
      const filterkeyEntry = val1 + ':' + this.filters[filterIndex].key + ':' + val;
      for (let i = 0 ; i < this.filterKeys.length ; i++) {
        if (this.filterKeys[i].indexOf(this.columns[colIndex].name + ':' + this.filters[filterIndex].key) !== -1) {
          this.filterKeys.splice(i, 1);
        }
      }
    }

    if (val !== '') {
      this.filterKeys.push(val1 + ':' + this.filters[filterIndex].key + ':' + val);
    }
  }

  filternumberData(val, colIndex, filterIndex) {
    const val1 = this.columns[colIndex].name;
    console.log('val is ' + val);
    // filter our data

    /* For Equal Filter */
    if ( this.numberFilters[filterIndex].key === this.numberFilters[0].key) {
      const temp = this.temp.filter(function(d) {
        return d[val1] === +val || !val;
      });
      this.rows = temp;
      const filterkeyEntry = val1 + ':' + this.numberFilters[filterIndex].key + ':' + val;
      for (let i = 0 ; i < this.filterKeys.length ; i++) {
        if (this.filterKeys[i].indexOf(this.columns[colIndex].name + ':' + this.numberFilters[filterIndex].key) !== -1) {
          this.filterKeys.splice(i, 1);
      }
      }
    } /* For Not Equal Filter */ else if (this.numberFilters[filterIndex].key === this.numberFilters[1].key) {
      const temp = this.temp.filter(function(d) {
        return d[val1] !== +val || !val;
      });
      this.rows = temp;
      const filterkeyEntry = val1 + ':' + this.numberFilters[filterIndex].key + ':' + val;
      for (let i = 0 ; i < this.filterKeys.length ; i++) {
        if (this.filterKeys[i].indexOf(this.columns[colIndex].name + ':' + this.numberFilters[filterIndex].key) !== -1) {
          this.filterKeys.splice(i, 1);
        }
      }
    } /* For Less than Filter */ else if (this.numberFilters[filterIndex].key === this.numberFilters[2].key) {
      const temp = this.temp.filter(function(d) {
        return d[val1] < +val || !val;
      });
      this.rows = temp;
      const filterkeyEntry = val1 + ':' + this.numberFilters[filterIndex].key + ':' + val;
      for (let i = 0 ; i < this.filterKeys.length ; i++) {
        if (this.filterKeys[i].indexOf(this.columns[colIndex].name + ':' + this.numberFilters[filterIndex].key) !== -1) {
          this.filterKeys.splice(i, 1);
        }
      }
    } /* For Greater than Filter */ else if (this.numberFilters[filterIndex].key === this.numberFilters[3].key) {
      const temp = this.temp.filter(function(d) {
        return d[val1] > +val || !val;
      });
      this.rows = temp;
      const filterkeyEntry = val1 + ':' + this.numberFilters[filterIndex].key + ':' + val;
      for (let i = 0 ; i < this.filterKeys.length ; i++) {
        if (this.filterKeys[i].indexOf(this.columns[colIndex].name + ':' + this.numberFilters[filterIndex].key) !== -1) {
          this.filterKeys.splice(i, 1);
        }
      }
    } /* For Less than equal to Filter */ else if (this.numberFilters[filterIndex].key === this.numberFilters[4].key) {
      const temp = this.temp.filter(function(d) {
        return d[val1] <= +val || !val;
      });
      this.rows = temp;
      const filterkeyEntry = val1 + ':' + this.numberFilters[filterIndex].key + ':' + val;
      for (let i = 0 ; i < this.filterKeys.length ; i++) {
        if (this.filterKeys[i].indexOf(this.columns[colIndex].name + ':' + this.numberFilters[filterIndex].key) !== -1) {
          this.filterKeys.splice(i, 1);
        }
      }
    } /* For greater than equal to Filter */ else if (this.numberFilters[filterIndex].key === this.numberFilters[5].key) {
      const temp = this.temp.filter(function(d) {
        return d[val1] >= +val || !val;
      });
      this.rows = temp;
      const filterkeyEntry = val1 + ':' + this.numberFilters[filterIndex].key + ':' + val;
      for (let i = 0 ; i < this.filterKeys.length ; i++) {
        if (this.filterKeys[i].indexOf(this.columns[colIndex].name + ':' + this.numberFilters[filterIndex].key) !== -1) {
          this.filterKeys.splice(i, 1);
        }
      }
    }
    console.log(this.filterKeys);
    if (val !== '') {
      this.filterKeys.push(val1 + ':' + this.numberFilters[filterIndex].key + ':' + val);
    }

  }


}
