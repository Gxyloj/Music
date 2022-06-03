import OJRequest from "./requset";

export function getSearchHot(){
  return OJRequest.get('/search/hot')
}

export function getSearchSuggest(keywords,type = 'mobile'){
  return OJRequest.get(`/search/suggest?keywords&`,{
    keywords,type
  })
}

export function getSearchResult(keywords){
  return OJRequest.get('/search',{
    keywords
  })
}