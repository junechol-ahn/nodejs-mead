import http from 'node:http'
import fetch from 'node-fetch'
import axios from 'axios'
import request from 'request'

const POST_URL = 'http://jsonplaceholder.typicode.com/posts/1'


async function use_fetch() {
    const response = await fetch(POST_URL)
    if (!response.ok) {
        console.error('Error: failed to fetch!');
    } else {
      const data = await response.json()
      console.log('\n\n-- use_fetch: ')
      console.log(data)
    }
}

async function use_axios() {
    try {
        const response = await axios.get(POST_URL)
        console.log('\n\n-- use_axios: ')
        console.log(response.data)
    } catch (error) {
        console.error('Error:', error.message);
    }
}

function use_node_http() {    
    http.get(
        POST_URL, 
        res => {
            let data = '';
            // Collect data chunks
            res.on('data', (chunk) => {
                data += chunk;
            });

            // Process the complete response
            res.on('end', () => {
                console.log('\n\n-- use_node_http: ')
                console.log(JSON.parse(data));
            });
    }).on('error', (err) => {
        console.error('Error:', err.message);
    });
}

function use_request() {
    request( POST_URL, (error, response) => {
        const data = JSON.parse(response.body)
        console.log('\n\n-- use_request: ')
        console.log(data)
    })
}

use_fetch()
use_axios()
use_node_http()
use_request()