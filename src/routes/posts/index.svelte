<!-- 
    As of @sveltejs/static-adapter@1.0.0-next.24, there is a bug that causes it to falsely
    detect 404 links from the blog posts when building for production. I believe it's the links
    from the headers, but I'm not sure why.
    
    Hopefully this will be fixed eventually. In the meantime, we'll just redirect
    to /. 
    
    Alternatively, you can remove the `autolinkHeadings` plugin from mdsvex.config.js
 -->
<script context="module">
  export const prerender = true

  export const load = async () => {
    return {
      status: 302,
      redirect: '/'
    }
  }
</script>
