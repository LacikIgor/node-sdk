/**
 * Copyright 2018 IBM All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AxiosResponse } from 'axios';
import * as extend from 'extend';
import { BaseService, getMissingParams } from 'ibm-cloud-sdk-core';
import { FileObject } from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * IBM Watson&trade; Language Translator translates text from one language to another. The service offers multiple IBM provided translation models that you can customize based on your unique terminology and language. Use Language Translator to take news from across the globe and present it in your language, communicate with your customers in their own language, and more.
 */

class LanguageTranslatorV3 extends BaseService {

  static URL: string = 'https://gateway.watsonplatform.net/language-translator/api';
  name: string; // set by prototype to 'language_translator'
  serviceVersion: string; // set by prototype to 'v3'

  /**
   * Construct a LanguageTranslatorV3 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.version - The API version date to use with the service, in "YYYY-MM-DD" format. Whenever the API is changed in a backwards incompatible way, a new minor version of the API is released. The service uses the API version for the date you specify, or the most recent version before that date. Note that you should not programmatically specify the current date at runtime, in case the API has been updated since your application's release. Instead, specify a version date that is compatible with your application, and don't change it until your application is ready for a later version.
   * @param {string} [options.url] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net/language-translator/api'). The base url may differ between Bluemix regions.
   * @param {string} [options.username] - The username used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
   * @param {string} [options.password] - The password used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
   * @param {string} [options.iam_access_token] - An IAM access token fully managed by the application. Responsibility falls on the application to refresh the token, either before it expires or reactively upon receiving a 401 from the service, as any requests made with an expired token will fail.
   * @param {string} [options.iam_apikey] - An API key that can be used to request IAM tokens. If this API key is provided, the SDK will manage the token and handle the refreshing.
   * @param {string} [options.iam_url] - An optional URL for the IAM service API. Defaults to 'https://iam.bluemix.net/identity/token'.
   * @param {boolean} [options.use_unauthenticated] - Set to `true` to avoid including an authorization header. This option may be useful for requests that are proxied.
   * @param {Object} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {boolean} [options.headers.X-Watson-Learning-Opt-Out] - Set to `true` to opt-out of data collection. By default, all IBM Watson services log requests and their results. Logging is done only to improve the services for future users. The logged data is not shared or made public. If you are concerned with protecting the privacy of users' personal information or otherwise do not want your requests to be logged, you can opt out of logging.
   * @constructor
   * @returns {LanguageTranslatorV3}
   * @throws {Error}
   */
  constructor(options: LanguageTranslatorV3.Options) {
    super(options);
    // check if 'version' was provided
    if (typeof this._options.version === 'undefined') {
      throw new Error('Argument error: version was not specified');
    }
    this._options.qs.version = options.version;
  }

  /*************************
   * translation
   ************************/

  /**
   * Translate.
   *
   * Translates the input text from the source language to the target language.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string[]} params.text - Input text in UTF-8 encoding. Multiple entries will result in multiple translations
   * in the response.
   * @param {string} [params.model_id] - A globally unique string that identifies the underlying model that is used for
   * translation.
   * @param {string} [params.source] - Translation source language code.
   * @param {string} [params.target] - Translation target language code.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public translate(params: LanguageTranslatorV3.TranslateParams, callback?: LanguageTranslatorV3.Callback<LanguageTranslatorV3.TranslationResult>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['text'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.translate(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const body = {
      'text': _params.text,
      'model_id': _params.model_id,
      'source': _params.source,
      'target': _params.target
    };

    const sdkHeaders = getSdkHeaders('language_translator', 'v3', 'translate');

    const parameters = {
      options: {
        url: '/v3/translate',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

  /*************************
   * identification
   ************************/

  /**
   * Identify language.
   *
   * Identifies the language of the input text.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.text - Input text in UTF-8 format.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public identify(params: LanguageTranslatorV3.IdentifyParams, callback?: LanguageTranslatorV3.Callback<LanguageTranslatorV3.IdentifiedLanguages>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['text'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.identify(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = _params.text;

    const sdkHeaders = getSdkHeaders('language_translator', 'v3', 'identify');

    const parameters = {
      options: {
        url: '/v3/identify',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'text/plain',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

  /**
   * List identifiable languages.
   *
   * Lists the languages that the service can identify. Returns the language code (for example, `en` for English or `es`
   * for Spanish) and name of each language.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public listIdentifiableLanguages(params?: LanguageTranslatorV3.ListIdentifiableLanguagesParams, callback?: LanguageTranslatorV3.Callback<LanguageTranslatorV3.IdentifiableLanguages>): Promise<any> | void {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : callback;

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.listIdentifiableLanguages(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const sdkHeaders = getSdkHeaders('language_translator', 'v3', 'listIdentifiableLanguages');

    const parameters = {
      options: {
        url: '/v3/identifiable_languages',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

  /*************************
   * models
   ************************/

  /**
   * Create model.
   *
   * Uploads Translation Memory eXchange (TMX) files to customize a translation model.
   *
   * You can either customize a model with a forced glossary or with a corpus that contains parallel sentences. To
   * create a model that is customized with a parallel corpus <b>and</b> a forced glossary, proceed in two steps:
   * customize with a parallel corpus first and then customize the resulting model with a glossary. Depending on the
   * type of customization and the size of the uploaded corpora, training can range from minutes for a glossary to
   * several hours for a large parallel corpus. You can upload a single forced glossary file and this file must be less
   * than <b>10 MB</b>. You can upload multiple parallel corpora tmx files. The cumulative file size of all uploaded
   * files is limited to <b>250 MB</b>. To successfully train with a parallel corpus you must have at least <b>5,000
   * parallel sentences</b> in your corpus.
   *
   * You can have a <b>maxium of 10 custom models per language pair</b>.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.base_model_id - The model ID of the model to use as the base for customization. To see
   * available models, use the `List models` method. Usually all IBM provided models are customizable. In addition, all
   * your models that have been created via parallel corpus customization, can be further customized with a forced
   * glossary.
   * @param {NodeJS.ReadableStream|FileObject|Buffer} [params.forced_glossary] - A TMX file with your customizations.
   * The customizations in the file completely overwrite the domain translaton data, including high frequency or high
   * confidence phrase translations. You can upload only one glossary with a file size less than 10 MB per call. A
   * forced glossary should contain single words or short phrases.
   * @param {NodeJS.ReadableStream|FileObject|Buffer} [params.parallel_corpus] - A TMX file with parallel sentences for
   * source and target language. You can upload multiple parallel_corpus files in one request. All uploaded
   * parallel_corpus files combined, your parallel corpus must contain at least 5,000 parallel sentences to train
   * successfully.
   * @param {string} [params.name] - An optional model name that you can use to identify the model. Valid characters are
   * letters, numbers, dashes, underscores, spaces and apostrophes. The maximum length is 32 characters.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public createModel(params: LanguageTranslatorV3.CreateModelParams, callback?: LanguageTranslatorV3.Callback<LanguageTranslatorV3.TranslationModel>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['base_model_id'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.createModel(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const formData = {
      'forced_glossary': {
        data: _params.forced_glossary,
        contentType: 'application/octet-stream'
      },
      'parallel_corpus': {
        data: _params.parallel_corpus,
        contentType: 'application/octet-stream'
      }
    };
 
    const query = {
      'base_model_id': _params.base_model_id,
      'name': _params.name
    };

    const sdkHeaders = getSdkHeaders('language_translator', 'v3', 'createModel');

    const parameters = {
      options: {
        url: '/v3/models',
        method: 'POST',
        qs: query,
        formData
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

  /**
   * Delete model.
   *
   * Deletes a custom translation model.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.model_id - Model ID of the model to delete.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public deleteModel(params: LanguageTranslatorV3.DeleteModelParams, callback?: LanguageTranslatorV3.Callback<LanguageTranslatorV3.DeleteModelResult>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['model_id'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.deleteModel(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const path = {
      'model_id': _params.model_id
    };

    const sdkHeaders = getSdkHeaders('language_translator', 'v3', 'deleteModel');

    const parameters = {
      options: {
        url: '/v3/models/{model_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

  /**
   * Get model details.
   *
   * Gets information about a translation model, including training status for custom models. Use this API call to poll
   * the status of your customization request. A successfully completed training will have a status of `available`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.model_id - Model ID of the model to get.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public getModel(params: LanguageTranslatorV3.GetModelParams, callback?: LanguageTranslatorV3.Callback<LanguageTranslatorV3.TranslationModel>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['model_id'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.getModel(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const path = {
      'model_id': _params.model_id
    };

    const sdkHeaders = getSdkHeaders('language_translator', 'v3', 'getModel');

    const parameters = {
      options: {
        url: '/v3/models/{model_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

  /**
   * List models.
   *
   * Lists available translation models.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.source] - Specify a language code to filter results by source language.
   * @param {string} [params.target] - Specify a language code to filter results by target language.
   * @param {boolean} [params.default_models] - If the default parameter isn't specified, the service will return all
   * models (default and non-default) for each language pair. To return only default models, set this to `true`. To
   * return only non-default models, set this to `false`. There is exactly one default model per language pair, the IBM
   * provided base model.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public listModels(params?: LanguageTranslatorV3.ListModelsParams, callback?: LanguageTranslatorV3.Callback<LanguageTranslatorV3.TranslationModels>): Promise<any> | void {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : callback;

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.listModels(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }
 
    const query = {
      'source': _params.source,
      'target': _params.target,
      'default': _params.default_models
    };

    const sdkHeaders = getSdkHeaders('language_translator', 'v3', 'listModels');

    const parameters = {
      options: {
        url: '/v3/models',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

}

LanguageTranslatorV3.prototype.name = 'language_translator';
LanguageTranslatorV3.prototype.serviceVersion = 'v3';

/*************************
 * interfaces
 ************************/

namespace LanguageTranslatorV3 {

  /** Options for the `LanguageTranslatorV3` constructor. */
  export type Options = {
    version: string;
    url?: string;
    iam_access_token?: string;
    iam_apikey?: string;
    iam_url?: string;
    username?: string;
    password?: string;
    use_unauthenticated?: boolean;
    headers?: object;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, body?: T, response?: AxiosResponse<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface Empty { }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `translate` operation. */
  export interface TranslateParams {
    /** Input text in UTF-8 encoding. Multiple entries will result in multiple translations in the response. */
    text: string[];
    /** A globally unique string that identifies the underlying model that is used for translation. */
    model_id?: string;
    /** Translation source language code. */
    source?: string;
    /** Translation target language code. */
    target?: string;
    headers?: Object;
    return_response?: boolean;
  }

  /** Parameters for the `identify` operation. */
  export interface IdentifyParams {
    /** Input text in UTF-8 format. */
    text: string;
    headers?: Object;
    return_response?: boolean;
  }

  /** Parameters for the `listIdentifiableLanguages` operation. */
  export interface ListIdentifiableLanguagesParams {
    headers?: Object;
    return_response?: boolean;
  }

  /** Parameters for the `createModel` operation. */
  export interface CreateModelParams {
    /** The model ID of the model to use as the base for customization. To see available models, use the `List models` method. Usually all IBM provided models are customizable. In addition, all your models that have been created via parallel corpus customization, can be further customized with a forced glossary. */
    base_model_id: string;
    /** A TMX file with your customizations. The customizations in the file completely overwrite the domain translaton data, including high frequency or high confidence phrase translations. You can upload only one glossary with a file size less than 10 MB per call. A forced glossary should contain single words or short phrases. */
    forced_glossary?: NodeJS.ReadableStream|FileObject|Buffer;
    /** A TMX file with parallel sentences for source and target language. You can upload multiple parallel_corpus files in one request. All uploaded parallel_corpus files combined, your parallel corpus must contain at least 5,000 parallel sentences to train successfully. */
    parallel_corpus?: NodeJS.ReadableStream|FileObject|Buffer;
    /** An optional model name that you can use to identify the model. Valid characters are letters, numbers, dashes, underscores, spaces and apostrophes. The maximum length is 32 characters. */
    name?: string;
    headers?: Object;
    return_response?: boolean;
  }

  /** Parameters for the `deleteModel` operation. */
  export interface DeleteModelParams {
    /** Model ID of the model to delete. */
    model_id: string;
    headers?: Object;
    return_response?: boolean;
  }

  /** Parameters for the `getModel` operation. */
  export interface GetModelParams {
    /** Model ID of the model to get. */
    model_id: string;
    headers?: Object;
    return_response?: boolean;
  }

  /** Parameters for the `listModels` operation. */
  export interface ListModelsParams {
    /** Specify a language code to filter results by source language. */
    source?: string;
    /** Specify a language code to filter results by target language. */
    target?: string;
    /** If the default parameter isn't specified, the service will return all models (default and non-default) for each language pair. To return only default models, set this to `true`. To return only non-default models, set this to `false`. There is exactly one default model per language pair, the IBM provided base model. */
    default_models?: boolean;
    headers?: Object;
    return_response?: boolean;
  }

  /*************************
   * model interfaces
   ************************/

  /** DeleteModelResult. */
  export interface DeleteModelResult {
    /** "OK" indicates that the model was successfully deleted. */
    status: string;
  }

  /** IdentifiableLanguage. */
  export interface IdentifiableLanguage {
    /** The language code for an identifiable language. */
    language: string;
    /** The name of the identifiable language. */
    name: string;
  }

  /** IdentifiableLanguages. */
  export interface IdentifiableLanguages {
    /** A list of all languages that the service can identify. */
    languages: IdentifiableLanguage[];
  }

  /** IdentifiedLanguage. */
  export interface IdentifiedLanguage {
    /** The language code for an identified language. */
    language: string;
    /** The confidence score for the identified language. */
    confidence: number;
  }

  /** IdentifiedLanguages. */
  export interface IdentifiedLanguages {
    /** A ranking of identified languages with confidence scores. */
    languages: IdentifiedLanguage[];
  }

  /** Translation. */
  export interface Translation {
    /** Translation output in UTF-8. */
    translation_output: string;
  }

  /** Response payload for models. */
  export interface TranslationModel {
    /** A globally unique string that identifies the underlying model that is used for translation. */
    model_id: string;
    /** Optional name that can be specified when the model is created. */
    name?: string;
    /** Translation source language code. */
    source?: string;
    /** Translation target language code. */
    target?: string;
    /** Model ID of the base model that was used to customize the model. If the model is not a custom model, this will be an empty string. */
    base_model_id?: string;
    /** The domain of the translation model. */
    domain?: string;
    /** Whether this model can be used as a base for customization. Customized models are not further customizable, and some base models are not customizable. */
    customizable?: boolean;
    /** Whether or not the model is a default model. A default model is the model for a given language pair that will be used when that language pair is specified in the source and target parameters. */
    default_model?: boolean;
    /** Either an empty string, indicating the model is not a custom model, or the ID of the service instance that created the model. */
    owner?: string;
    /** Availability of a model. */
    status?: string;
  }

  /** The response type for listing existing translation models. */
  export interface TranslationModels {
    /** An array of available models. */
    models: TranslationModel[];
  }

  /** TranslationResult. */
  export interface TranslationResult {
    /** Number of words in the input text. */
    word_count: number;
    /** Number of characters in the input text. */
    character_count: number;
    /** List of translation output in UTF-8, corresponding to the input text entries. */
    translations: Translation[];
  }

}

export = LanguageTranslatorV3;
