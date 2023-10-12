import { Component } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

type debtType = 'monthy' | 'random'


interface nubankModel {
  id: number;
  date: Date;
  description: string;
  value: number;
  category?: matchModel

}

interface matchModel extends item {
  tag: string;
}

interface categoryModel extends item {
  tags: string[];
  amount: number;
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

panelOpenState = false


  addOnBlurTags = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  newCategoryValue = '';
  showNonCategorized = false;

  monthyModel = ['Apple.Com/Bill'];
  eventualModel: categoryModel[] = [
    {
      id: 1,
      name: 'Farmacia',
      tags: ['drogaria', 'drogasil'],
      amount:0
    },
    {
      id: 2,
      name: 'Eventos',
      tags: ['Cinemarquise'],
      amount:0

    },
    {
      id: 3,
      name: 'Uber',
      tags: ['Uber'],
      amount:0

    },
    {
      id: 4,
      name: '99',
      tags: ['99'],
      amount:0
    },
    {
      id: 5,
      name: 'Restaurante',
      tags: ['restaurante', 'Grill'],
      amount:0
    }, 
  ]

  matches: matchModel[] = [];

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
    },
    {
      id: 3,
      date: new Date(),
      description: 'cccccc',
      value: 11.44,
      category: undefined
    }

  ];

  eventualCalculation: { [key: string]: number } = {};

  async importCSVFile(e: any) {

    await this.createRecordSet(e.target.files[0]);

    this.compileMatches();
 
    this.doMatches();

    this.coumputeAmount();
  }

  compileMatches() {
    this.matches = [];
    this.eventualModel.forEach(e => e.tags.forEach(tag => this.matches.push({ id: e.id, name: e.name, tag: tag })));
  }

  doMatches() {
    this.records
    .map(m => { m.category = undefined; return m } )
    .map(r => {
      for (let i = 0; i < this.matches.length; i++) {
        if (r.description.toLowerCase().indexOf(this.matches[i].tag.toLowerCase()) >= 0) {
          r.category = this.matches[i];
          break;
        }
      }
    });
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
    this.records.forEach(e => {
      if (e.description == record.description && !e.category) {
        e.category = { id: eventual.id, name: eventual.name, tag: record.description };
      }
    });

    eventual.tags.push(record.description);

    this.compileMatches();

    this.coumputeAmount();
  }

  addTag(category: categoryModel, event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      console.log("Add nova tag", event)
      if (!category.tags.includes(value)) {
        category.tags.push(value);
      }
    }

    this.compileMatches();

    this.doMatches();

    this.coumputeAmount();

    event.chipInput!.clear();
  }

  removeTag(category:categoryModel, tag: string): void {

    const index = category.tags.indexOf(tag, 0);
    if (index > -1) {
      category.tags.splice(index, 1);
    }

    this.compileMatches();

    this.doMatches();

    this.coumputeAmount();
  }

  coumputeAmount() {
    this.eventualModel.map(m => {
      m.amount = this.records.filter(f => f.category?.id == m.id)
                    .reduce((sum, current) => sum + current.value, 0);
    });

  }

  newCategoryClicked() {
    this.eventualModel.push({
      id: new Date().getMilliseconds(),
      name: this.newCategoryValue,
      tags: [],
      amount: 0
    });

    this.newCategoryValue = '';
  }

  showCategorizedToogle() {
    this.showNonCategorized = !this.showNonCategorized;
  }
}