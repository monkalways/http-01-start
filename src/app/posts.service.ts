import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostsService {
  constructor(private http: HttpClient) {
  }

  createAndStorePost(title: string, content: string): Observable<{ name: string }> {
    const postData: Post = { title, content };
    return this.http.post<{ name: string }>(
      'https://ng8-complete-guide-37ec4.firebaseio.com/posts.json',
      postData
    );
  }

  fetchPosts(): Observable<Post[]> {
    return this.http.get<{ [key: string]: Post }>('https://ng8-complete-guide-37ec4.firebaseio.com/posts.json')
      .pipe(map(responseData => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], id: key});
          }
        }
        return postsArray;
      }));
  }

  deletePosts(): Observable<object> {
    return this.http.delete('https://ng8-complete-guide-37ec4.firebaseio.com/posts.json');
  }
}
