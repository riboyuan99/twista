# -*- coding: utf-8 -*-
import requests
from flask import Flask, request
import json
from pprint import pprint
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


bearer_token = "AAAAAAAAAAAAAAAAAAAAAGmmogEAAAAAEf3Pat%2FwV2Kb1INOGgXQG%2B6suss%3D2VKZ2UFgeRlOL1ydyp8qiQrhcq7Gg6IaiSfDtWKjL7kGogWWKY"
search_url = "https://api.twitter.com/2/tweets/search/recent"


def bearer_oauth(r):
    """
    Method required by bearer token authentication.
    """

    r.headers["Authorization"] = f"Bearer {bearer_token}"
    r.headers["User-Agent"] = "v2FullArchiveSearchPython"
    return r

def connect_to_endpoint(url, params):
    response = requests.request(
        "GET", search_url, auth=bearer_oauth, params=params)
    print("response: ", response)
    if response.status_code != 200:
        print("Error: response.status_code", response.status_code)
        print("Check doc https://developer.twitter.com/en/support/twitter-api/error-troubleshooting")
        raise Exception(response.status_code, response.text)

    return response.json()


@app.route("/searchTweets",methods=["GET","POST"])
def get_tweets():
    search_params = request.get_json()
    print("params: ", search_params)
    keyword_arr = search_params['include'].replace(' ', ' OR ') # online learning OR online quality
    keyword_arr = '('+ keyword_arr +')'

    counts = int(search_params['numTweets'])
    lang_option = "en"

    exclusive_words = search_params['exclude']

    api_response = []


    # Main Search Keywords
    query = keyword_arr

    # Negated keyword operator
    if len(exclusive_words) > 0:
        for w in exclusive_words.split():
            query += ' -' + str(w)


    # 'und' - undefined, only 1 language is defined for each tweet
    #if len(lang_option) >0:
    query += ' lang:' + str(lang_option)

    # Deliver only Tweets whose authors are verified by Twitter. 0.1% are verified
    is_verified = True
    if is_verified:
        query += ' is:verified'

    remove_reply = True
    if remove_reply:
        query += ' -is:reply'

    remove_retweet = True
    if remove_retweet:
        query += ' -is:retweet'

    has_image = False
    if has_image:
        query += ' has:images'

    # need elevated access
    has_geo = False
    if has_geo:
        query += ' has:geo'

    query_params = {'query': query,  # "election lang:und -is:retweet",
                    'max_results': counts
                    }  # information for users

    print('***** Search Query:', query_params)
    # Call the twitter API with the given paramaters. Save the returned_result temporarily.
    try: 
        rescheck = connect_to_endpoint(search_url, query_params)
    except:
        return json.dumps({"returned_result":"Too Many Requests", "suggest_keywords": None})

    if(rescheck['meta']['result_count'] != 0): # Note: rescheck['meta']['result_count'] should match with count
        return json.dumps({"returned_result": rescheck["data"]})
    else:
        print("Please update your search query")



    pprint(api_response)

    return "Error - check your search query"



if __name__ == "__main__":

    app.run(port=8081, debug=False)

    #nohup python searchTweetsNew.py &> apilog.out &