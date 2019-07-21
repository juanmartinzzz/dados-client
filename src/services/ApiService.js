import { getRequestUrl } from "./utils";
// import { Deserializer } from "jsonapi-serializer";

// const deserializerOptions = { keyForAttribute: "camelCase" };

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json"
};

export default class ApiService {
  constructor(autoDeserialize = true) {
    this.autoDeserialize = autoDeserialize;
  }

  async deserialize(data) {
    return data;
    // return await new Deserializer(deserializerOptions).deserialize(data);
  }

  async get(path, params = {}, requestHeaders = {}) {
    const headers = { ...defaultHeaders, ...requestHeaders };
    const response = await fetch(getRequestUrl(path, params), {
      method: "GET",
      headers
    });

    return this.processResponse(response);
  }

  async post(path, data, params = {}, requestHeaders = {}) {
    const headers = { ...defaultHeaders, ...requestHeaders };
    const response = await fetch(getRequestUrl(path, params), {
      method: "POST",
      body: JSON.stringify(data),
      headers
    });

    return this.processResponse(response);
  }

  async patch(path, data, params = {}, requestHeaders = {}) {
    const headers = { ...defaultHeaders, ...requestHeaders };
    if (data.id) {
      delete data.id;
    }
    const response = await fetch(getRequestUrl(path, params), {
      method: "PATCH",
      body: JSON.stringify(data),
      headers
    });

    return this.processResponse(response);
  }

  async delete(path, params = {}, requestHeaders = {}) {
    const headers = { ...defaultHeaders, ...requestHeaders };
    const response = await fetch(getRequestUrl(path, params), {
      method: "DELETE",
      headers
    });

    return this.processResponse(response);
  }

  async processResponse(response) {
    await this.checkStatus(response);
    let data = await this.responseToJson(response);
    if (this.autoDeserialize) {
      data = await data.deserializeData();
    }
    return data;
  }

  async checkStatus(response) {
    if (!response.ok) {
      let errorMessage = `Failed request (${response.status}) ${response.url}`;
      let errorData = undefined;
      let errorIsJson = false;

      const responseContentType = response.headers.get("content-type");
      const jsonContentTypesInResponseHeaders = [
        "application/json",
        "application/vnd.api+json"
      ].filter(
        jsonContentType =>
          responseContentType &&
          responseContentType.indexOf(jsonContentType) !== -1
      );
      errorIsJson = jsonContentTypesInResponseHeaders.length > 0;

      if (errorIsJson) {
        errorData = await this.responseToJson(response);
        const { errors } = errorData;
        if (errors.length > 0 && errors[0].detail) {
          errorMessage += `: ${errors[0].detail}`;
        }
      }

      const error = new Error(errorMessage);
      error.data = errorData;
      error.response = response;
      throw error;
    }
  }

  async responseToJson(response) {
    const jsonResponse = await response.json();
    if ("deserializeData" in jsonResponse) {
      throw new Error(
        "Response has a `deserializeData` attribute, which is not supported by ApiService"
      );
    }
    jsonResponse.deserializeData = async () => {
      const deserialized = await this.deserialize(jsonResponse);
      return deserialized;
    };
    return jsonResponse;
  }
}
