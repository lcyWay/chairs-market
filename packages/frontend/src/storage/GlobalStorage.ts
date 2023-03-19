import { action, makeObservable, observable, runInAction } from "mobx";

import { ApiAbstractClass } from "api";

import { ChairInterface } from "types/chair";
import { TagInterface } from "types/tag";

import { BasketStorage } from "./BasketStorage";

class GlobalStorageClass extends ApiAbstractClass {
  constructor() {
    super();
    makeObservable(this);
  }

  @observable
  tagsLoading = true;

  @observable
  tags: TagInterface[] = [];

  @observable
  selectedTags: string[] = [];

  @observable
  chairsLoading = true;

  @observable
  chairs: ChairInterface[] = [];

  @action.bound
  changeSelectedTags(id: string) {
    const foundIndex = this.selectedTags.findIndex((tag) => tag === id);
    foundIndex === -1 ? this.selectedTags.push(id) : this.selectedTags.splice(foundIndex, 1);
    this.loadChairs();
  }

  @action.bound
  clearSelectedTags() {
    if (this.selectedTags.length === 0) return;
    this.selectedTags = [];
    this.loadChairs();
  }

  @action.bound
  async loadChairs() {
    this.chairsLoading = true;
    this.chairs = [];
    const result = await this.makeRequest<ChairInterface[]>("/chairs", {
      method: "POST",
      body: JSON.stringify({ tags: this.selectedTags }),
    });
    this.chairsLoading = false;
    if (!result.success) return;
    this.chairs = result.data;
    BasketStorage.validateBasket();
  }

  @action.bound
  async loadTags() {
    this.tagsLoading = true;
    const result = await this.makeRequest<TagInterface[]>("/tags");
    this.tagsLoading = false;
    if (!result.success) return;
    this.tags = result.data;
  }
}

export const GlobalStorage = new GlobalStorageClass();

runInAction(() => Promise.all([GlobalStorage.loadTags(), GlobalStorage.loadChairs()]));
