import { OverseeAll } from "@oversee/core";

const API_PREFIX = "https://randomuser.me/api/";

export interface IUser {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

interface IResponse {
  results: IUser[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

@OverseeAll()
export class UserController {
  public async getRandomUser(): Promise<IUser> {
    this.loading(true);

    const response = await this.get<IResponse>("");

    this.loading(false);

    return response.results[0];
  }

  public loading(state: boolean) {
    return state;
  }

  private get<Success>(path, query = {}): Promise<Success> {
    const url = new URL(`${API_PREFIX}${path}`);
    Object.keys(query).forEach((queryKey) =>
      url.searchParams.append(queryKey, query[queryKey])
    );
    return window
      .fetch(url)
      .then((response) => response.text())
      .then((json) => JSON.parse(json) as Success);
  }
}
