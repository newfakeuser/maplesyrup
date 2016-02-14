FOR /L %%G IN (1,1,10) DO node index.js < sampleData10kx10k > output
FOR /L %%G IN (1,1,10) DO node index.js < sampleData100kx100k > output
FOR /L %%G IN (1,1,10) DO node index.js < sampleData800kx800k > output
