import { Component } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

type debtType = 'monthy' | 'random'

interface nubankModel {
  id: number;
  date: Date;
  description: string;
  value: number;
  category?: item
}

interface matchModel extends item {
  tag: string;
}

interface categoryModel extends item {
  tags: string[];
}

interface item {
  id: number;
  name: string;
}

const dateIndexNubankModel = 0;
const descriptionIndexNubankModel = 2;
const valueIndexNubankModel = 3;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'poupatempo-app';

  addOnBlurTags = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  newCategoryValue = '';
  showNonCategorized = false;

  monthyModel = ['Apple.Com/Bill'];
  eventualModel: categoryModel[] = [
    {
      id: 1,
      name: 'Farmacia',
      tags: ['drogaria', 'drogasil']
    },
    {
      id: 2,
      name: 'Eventos',
      tags: ['Cinemarquise']
    }
  ]

  records: nubankModel[] = [
    {
      id: 0,
      date: new Date(),
      description: 'aaaaaa',
      value: 11.22,
      category: undefined
    },
    {
      id: 1,
      date: new Date(),
      description: 'bbbbbb',
      value: 11.33,
      category: undefined
    },
    {
      id: 2,
      date: new Date(),
      description: 'cccccc',
      value: 11.44,
      category: undefined
    }

  ];

  eventualCalculation: { [key: string]: number } = {};

  async importCSVFile(e: any) {

    await this.createRecordSet(e.target.files[0]);

    let matches: matchModel[] = [];
    this.eventualModel.forEach(e => e.tags.forEach(tag => matches.push({ id: e.id, name: e.name, tag: tag })));

    this.records.map(r => {
      for (let i = 0; i < matches.length; i++) {
        if (r.description.toLowerCase().indexOf(matches[i].tag.toLowerCase()) >= 0) {
          this.eventualCalculation[matches[i].name] += r.value;
          r.category = matches[i];
          break;
        }
      }
    })

    console.log("records", this.records);
  }

  private async createRecordSet(file: File): Promise<void> {
    const content = await file.text();
    var rows = content.toString().replaceAll('\r', '').split('\n');
    this.records = [];
    rows.forEach((e, i) => {
      if (e) {
        const o = e.split(',');
        const d = o[dateIndexNubankModel].split('-');
        const model = {
          id: i,
          date: new Date(+d[0], +d[1], +d[2]),
          description: o[descriptionIndexNubankModel],
          value: +o[valueIndexNubankModel],
          category: undefined
        }
        this.records.push(model);
      }
    });

    this.records.shift();

    //console.log("content", content)
    // console.log("rows", rows)
  }

  categoryChanged(eventual: categoryModel, record: nubankModel) {
    record.category = eventual;
  }

  addTag(category:categoryModel, event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      console.log("Add nova tag", event)
      if(!category.tags.includes(value))
      {
        category.tags.push(value);
      }
    }
    event.chipInput!.clear();
  }

  removeTag(tag: string): void {
    
  }

  editTag(tag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.removeTag(tag);
      return;
    }

    // // Edit existing fruit
    // const index = this.fruits.indexOf(fruit);
    // if (index >= 0) {
    //   this.fruits[index].name = value;
    // }
  }

  newCategoryClicked() {
    console.log(">>", this.newCategoryValue)
    this.eventualModel.push({
        id: new Date().getMilliseconds(),
        name:this.newCategoryValue,
        tags: []
    });

    this.newCategoryValue = '';
  }

  showCategorizedToogle() {
    this.showNonCategorized = !this.showNonCategorized;
  }
}