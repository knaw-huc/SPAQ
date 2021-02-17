{include file="header.tpl"}
{include file="menu.tpl"}

        {foreach from=$list item="f"}
            <div>
            <span class="filename">{$f}</span>
                <audio controls src="{$dir}/{$f}">
                    Your browser does not support the
                    <code>audio</code> element.
                </audio> 
            </div>    
        {/foreach}

{include file="footer.tpl"}

